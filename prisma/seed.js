import 'dotenv/config';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Iniciando seed...');
    await prisma.food.deleteMany();

    await prisma.food.createMany({
        data: [
            { name: 'Hamburger', description: 'Um delicioso hamburger com carne artesanal', price: 49.90, category: 'prato principal', available: true },

            { name: 'Batata frita', description: 'batatas fritas bem fritas', price: 25.90, category: 'fritos', available: true },

            { name: 'Coca-cola', description: 'Refrigerante de cola', price: 8.00, category: 'Refrigerante', available: false },

            { name: 'Sorvete', description: 'Um delicioso sorvete de baunilha com calda de chocolate', price: 12.00, category: 'Sobremesas', available: false },

            { name: 'salada', description: 'uma deliciosa salada diet com tempero balanceado', price: 20.00, category: 'Saladas', available: true}
        ],
    });

    console.log('✅ Seed concluído!');
}

main()
    .catch((e) => {
        console.error('❌ Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
