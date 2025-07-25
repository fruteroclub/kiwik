# Proof of Verano - Guía de Deployment y Testing

## 📍 Información del Contrato

- **Red**: Base Sepolia (Testnet)
- **Dirección**: `0xc50dc3d7a967393a4ebf7944b0c6c819d10aa250`
- **Explorer**: [BaseScan Sepolia](https://sepolia.basescan.org/address/0xc50dc3d7a967393a4ebf7944b0c6c819d10aa250)

## 🚀 Configuración Local

### 1. Variables de Entorno

Crea un archivo `.env.local` basado en `.env.example`:

```bash
# Copia el archivo de ejemplo
cp .env.example .env.local

# Asegúrate de que la dirección del contrato esté configurada
NEXT_PUBLIC_PROOF_OF_VERANO_ADDRESS=0xc50dc3d7a967393a4ebf7944b0c6c819d10aa250
```

### 2. Configurar Base Sepolia en tu Wallet

**Agregar Red Base Sepolia:**
- **Network Name**: Base Sepolia
- **RPC URL**: https://sepolia.base.org
- **Chain ID**: 84532
- **Currency Symbol**: ETH
- **Block Explorer**: https://sepolia.basescan.org

### 3. Obtener ETH de Testnet

Puedes obtener ETH de testnet gratis en:
- [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet)
- [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)

## 🧪 Testing del MVP

### Flujo de Usuario Básico

1. **Conectar Wallet**
   - Navega a `/verano`
   - Conecta tu wallet (MetaMask, Coinbase Wallet, etc.)
   - Asegúrate de estar en Base Sepolia

2. **Registro de Estudiante**
   - Click en "Registrarme Ahora"
   - Confirma la transacción en tu wallet
   - Espera la confirmación on-chain

3. **Ver Dashboard**
   - Una vez registrado, accede a "Mi Dashboard"
   - Verifica tu estado y progreso

### Flujo de Administrador

1. **Acceso Admin**
   - Solo el owner del contrato puede acceder
   - Click en tab "Admin" (solo visible para owner)

2. **Completar Bootcamp**
   - Ingresa dirección del estudiante
   - Asigna score (0-10)
   - Agrega entregables
   - Click "Marcar como Completado"

3. **Otorgar NFT**
   - Ingresa URI del token (metadata)
   - Click "Otorgar NFT"

## 🔍 Verificación On-Chain

### Usando BaseScan

1. Visita: https://sepolia.basescan.org/address/0xc50dc3d7a967393a4ebf7944b0c6c819d10aa250

2. **Verificar Transacciones:**
   - Tab "Transactions" para ver todas las interacciones
   - Busca tu dirección para ver tus transacciones

3. **Leer Estado del Contrato:**
   - Tab "Read Contract"
   - Función `students(address)` para ver info de estudiantes
   - Función `owner()` para ver el admin

### Usando la Consola del Navegador

```javascript
// Verificar conexión
console.log('Wallet conectada:', window.ethereum.selectedAddress);

// Ver estado del estudiante actual
// (La app expone esto a través del hook useProofOfVerano)
```

## 🐛 Troubleshooting

### Errores Comunes

1. **"Transaction Failed"**
   - Verifica que tienes suficiente ETH para gas
   - Asegúrate de estar en Base Sepolia

2. **"Not Authorized"**
   - Solo el owner puede ejecutar funciones admin
   - Verifica que estás usando la wallet correcta

3. **"Student Not Signed Up"**
   - El estudiante debe registrarse primero
   - Verifica la dirección ingresada

### Logs y Debugging

```bash
# Ver logs del servidor
bun run dev

# Inspeccionar Network en Chrome DevTools
# Filtrar por "eth_" para ver llamadas RPC
```

## 📊 Métricas de Testing

### Checklist MVP

- [ ] ✅ Conexión de wallet funcional
- [ ] ✅ Registro de estudiantes on-chain
- [ ] ✅ Dashboard muestra info correcta
- [ ] ✅ Admin puede completar bootcamp
- [ ] ✅ NFT display funcional
- [ ] ✅ Transacciones confirmadas en <30s
- [ ] ✅ UI responsiva en móvil
- [ ] ✅ Manejo de errores claro

### Performance

- **Tiempo de carga**: < 3s
- **Confirmación tx**: ~15-30s en Base Sepolia
- **Gas estimado**:
  - signUp: ~50,000 gas
  - completeBootcamp: ~100,000 gas
  - awardNFT: ~150,000 gas

## 🚀 Próximos Pasos

1. **Mejoras Inmediatas**
   - Agregar loading states más claros
   - Implementar caché de datos on-chain
   - Mejorar diseño del NFT

2. **Features Post-MVP**
   - Lista de todos los estudiantes
   - Leaderboard por score
   - Integración con IPFS para metadata
   - Notificaciones de progreso

3. **Deployment a Mainnet**
   - Auditoría del contrato
   - Optimización de gas
   - Plan de migración de datos