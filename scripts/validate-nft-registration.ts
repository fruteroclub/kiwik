// Server-side only script - do not import in client code
import { PrismaClient } from '@prisma/client';
import { ProofOfVeranoABI } from '@/lib/contracts/ProofOfVeranoABI';
import { createPublicClient, http } from 'viem';
import { baseSepolia } from 'viem/chains';

const prisma = new PrismaClient();

const CONTRACT_ADDRESS = '0xc50dc3d7a967393a4ebf7944b0c6c819d10aa250';

/**
 * Script para validar y sincronizar usuarios con NFTs
 */
export default async function validateNFTRegistration() {
  // Cliente para leer del contrato
  const client = createPublicClient({
    chain: baseSepolia,
    transport: http()
  });

  console.log('🔍 Validando registros de NFT...\n');

  try {
    // 1. Obtener todos los usuarios de la BD
    const dbUsers = await prisma.user.findMany({
      where: {
        OR: [
          { bootcampCompleted: true },
          { nftTokenId: { not: null } }
        ]
      }
    });

    console.log(`📊 Usuarios en BD con NFT: ${dbUsers.length}`);

    // 2. Verificar cada usuario contra el contrato
    for (const user of dbUsers) {
      if (!user.appWallet) continue;

      // Consultar estado en el contrato
      const studentInfo = await client.readContract({
        address: CONTRACT_ADDRESS,
        abi: ProofOfVeranoABI,
        functionName: 'getStudentInfo',
        args: [user.appWallet]
      });

      const [signedUp, completed] = studentInfo as [boolean, boolean];

      console.log(`\n👤 Usuario: ${user.username || user.appWallet}`);
      console.log(`   BD - NFT: ${user.nftTokenId ? '✅' : '❌'}`);
      console.log(`   Contrato - Registrado: ${signedUp ? '✅' : '❌'}`);
      console.log(`   Contrato - Completado: ${completed ? '✅' : '❌'}`);

      // Detectar inconsistencias
      if (completed && !user.bootcampCompleted) {
        console.log(`   ⚠️  INCONSISTENCIA: NFT en contrato pero no en BD`);
        
        // Opción: Actualizar BD
        // await userService.updateUser(user.id, {
        //   bootcampCompleted: true,
        //   completionDate: new Date()
        // });
      }

      if (user.bootcampCompleted && !completed) {
        console.log(`   ⚠️  INCONSISTENCIA: NFT en BD pero no en contrato`);
      }
    }

    // 3. Buscar NFTs mintados directamente (opcional)
    // Esto requeriría escuchar eventos Transfer del contrato
    console.log('\n📝 Para detectar NFTs mintados directamente:');
    console.log('   - Escuchar eventos Transfer del contrato');
    console.log('   - Comparar con registros en BD');
    console.log('   - Crear registros faltantes');

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Función para sincronizar un usuario específico
export async function syncUserWithContract(walletAddress: string) {
  const client = createPublicClient({
    chain: baseSepolia,
    transport: http()
  });

  try {
    // Verificar estado en contrato
    const studentInfo = await client.readContract({
      address: CONTRACT_ADDRESS,
      abi: ProofOfVeranoABI,
      functionName: 'getStudentInfo',
      args: [walletAddress]
    });

    const [signedUp, completed, commitmentScore] = studentInfo as [boolean, boolean, bigint];

    if (completed) {
      // Usuario tiene NFT en el contrato
      let user = await prisma.user.findFirst({
        where: { appWallet: walletAddress.toLowerCase() }
      });
      
      if (!user) {
        // Crear usuario si no existe
        console.log('Creating user from contract data...');
        user = await prisma.user.create({
          data: {
            appWallet: walletAddress.toLowerCase(),
            bootcampCompleted: true,
            completionDate: new Date(),
            commitmentScore: Number(commitmentScore),
            username: `grad_${walletAddress.slice(-8)}`
          }
        });
      } else if (!user.bootcampCompleted) {
        // Actualizar si existe pero no está marcado como completado
        console.log('Updating user completion status...');
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            bootcampCompleted: true,
            completionDate: new Date(),
            commitmentScore: Number(commitmentScore)
          }
        });
      }

      return { synced: true, user };
    }

    return { synced: false, message: 'User has not completed bootcamp' };
  } catch (error) {
    console.error('Sync error:', error);
    throw error;
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  validateNFTRegistration()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}