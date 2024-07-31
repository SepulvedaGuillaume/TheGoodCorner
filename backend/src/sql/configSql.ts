import { Client } from 'pg';

const client = new Client({
  user: 'postgres',
  host: 'postgres', 
  database: 'thegoodcorner',
  password: 'root',
  port: 5432,
});

client.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données', err.stack);
  } else {
    console.log('Connecté à la base de données');
  }
});

export default client;