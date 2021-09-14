import { hash } from "bcrypt";
import { v4 } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = v4();
  const password = await hash("admin", 8);

  await connection.query(`
  INSERT INTO users(id, name, password, email, driver_license, is_admin, created_at)
  VALUES('${id}', 'Adan', '${password}', 'adan@rentx.com', '123456', true, 'now()')
  `);

  await connection.close();
}

create().then(() => console.log("Admin created."));
