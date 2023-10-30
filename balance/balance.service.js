const { db, User } = require('../database/db');
const { Transaction } = require('sequelize');
const { HttpError } = require('../errors/httperror');

class BalanceService {
    async updateBalance(input) {
        const { userId, amount } = input;
        const result = await db.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        }, async (t) => {
            const user = await User.findByPk(userId, { lock: true, transaction: t });
            if (!user) throw new HttpError('User not found', 400 );
            if (user.balance - amount < 0) throw new HttpError('Insufficient funds', 409);
            user.balance -= amount;
            await user.save({ transaction: t });
            return user.balance;
        });
        return { remainingBalance: result };
    }
}

module.exports = new BalanceService();
