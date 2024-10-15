import db from '../config/config-db';
import Admin from '../Dto/adminDto';
import bcrypt from 'bcryptjs';
import Auth from '../Dto/AuthDto';
// import { emit } from 'process';
// import { run } from 'node:test';


class AdminRepository {

    static async add(user: Admin){
        const sql = 'INSERT INTO administrator (name, email, password) VALUES (?, ?, ?)';
        const values = [user.name, user.email, user.password,];        
        return db.execute(sql, values);
    }
    

    static async login(auth: Auth){
        const sql = 'SELECT id, password FROM administrator WHERE email=?';
        const values = [auth.email];
        const result: any = await db.execute(sql, values);

        console.log(result[0]);

        if (result[0].length > 0){
          const isPasswordValid = await bcrypt.compare(auth.password, result[0][0].password);
          if (isPasswordValid){
            return {logged: true, status:  "Successful authentication", id: result[0][0].id}
          }
          return {logged: false, status: "Invalid username or password" };
        }
        return {logged: false, status: "Invalid username or password" };
    }

    static delete = async (email : string, password : string) => {

      const sql = 'select id, password FROM administrator WHERE email = ?';
      const value = [email];
      const [row] : any = await db.execute(sql,value);

      if (row.length > 0){
        const passwordValida = await bcrypt.compare(password, row[0].password);
      if(passwordValida){
        const sql = 'DELETE FROM administrator WHERE id = ?';
        const value = [row[0].id];
        const result = await db.execute(sql,value);
        return { message : 'Eliminado exitosamente'};
      }
      return { message: 'Contraseña inválida'};
      }

      return { message : 'Email incorrecto'};

    }


    static get = async (email: string) => {

      const sql = 'SELECT name, email FROM administrator WHERE email = ?';
      const [result]: any = await db.execute(sql, [email]) 

      if (result.length > 0) {
        return result[0]
      }else
        return { message: 'Usuario no encontrado'}
    };

    static emailExiste = async (email: string) => {
      const sql = "SELECT COUNT(*) as count FROM administrator WHERE email = ?";
      const [rows] : any = await db.execute(sql, [email]);
      const row = rows[0] as { count: number };
      return row.count > 0;
    };

    static update = async (email: string, newName: string, newPassword: string) => {
      const sqlSelect = 'SELECT * FROM administrator WHERE email = ?';
      const [rows]: any = await db.execute(sqlSelect, [email]);
  
      if (rows.length > 0) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
  
        const sqlUpdate = 'UPDATE administrator SET name = ?, password = ? WHERE email = ?';
        const values = [newName, hashedPassword, email];
        await db.execute(sqlUpdate, values);
  
        return { message: 'Usuario actualizado exitosamente' };
      } else {
        return { message: 'Usuario no encontrado' };
      }
    };


}


export default AdminRepository;