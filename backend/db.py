import psycopg2
import os
from dotenv import load_dotenv

# Carrega as variáveis do .env
load_dotenv()

# database: usuarios
# Use suas credenciais do Neon aqui:
DATABASE_URL = os.getenv("DATABASE_URL")

def get_connection():
    return psycopg2.connect(DATABASE_URL)

if __name__ == "__main__":
    conn = get_connection()
    print("Conexão com o Neon bem-sucedida!")
    conn.close()
