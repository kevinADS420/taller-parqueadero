import db from '../config/config-db';
import Cust from '../Dto/customers/custDto'
import bcrypt from 'bcryptjs';



class CustRepository {

    static async add(user: Cust){
        const sql = 'INSERT INTO customers (nameUser, marca, placa) VALUES (?, ?, ?)';
        const values = [user.nameUser, user.marca, user.placa,];        
        return db.execute(sql, values);
    }

    static usersExiste = async (placa: string) => {
        const sql = "SELECT COUNT(*) as count FROM customers WHERE placa = ?";
        const [rows] : any = await db.execute(sql, [placa]);
        const row = rows[0] as { count: number };
        return row.count > 0;
      };


      static delete = async (nameUser : string, placa : string) => {

        const sql = 'select id, placa FROM customers WHERE id = ?';
        const value = [nameUser];
        const [row] : any = await db.execute(sql,value);
  
        if (row.length > 0){
          const passwordValida = await bcrypt.compare(placa, row[0].password);
        if(passwordValida){
          const sql = 'DELETE FROM customers WHERE id = ?';
          const value = [row[0].id];
          const result = await db.execute(sql,value);
          return { message : 'Eliminado exitosamente'};
        }
        return { message: 'Contraseña inválida'};
        }
  
        return { message : 'Email incorrecto'};
  
      }

      static update = async (placa: string, nameUser: string, marca?: string) => {
        const sqlSelect = 'SELECT * FROM customers WHERE placa = ?';
        const [rows]: any = await db.execute(sqlSelect, [placa]);
    
        if (rows.length > 0) {
            const values = [
                nameUser !== undefined ? nameUser : null,
                marca !== undefined ? marca : null,
                placa
            ];
    
            const sqlUpdate = 'UPDATE customers SET nameUser = ?, marca = ? WHERE placa = ?';
            await db.execute(sqlUpdate, values);
    
            return { message: 'Usuario actualizado exitosamente' };
        } else {
            return { message: 'Usuario no encontrado' };
        }
    };

      static get = async (placa: string) => {
        const sql = 'SELECT nameUser, marca FROM customers WHERE placa = ?';
        const [result]: any = await db.execute(sql, [placa]);
      
        if (result.length > 0) {
          return result[0];
        } else {
          return { message: 'Usuario no encontrado' };
        }
      };


}

export default CustRepository;