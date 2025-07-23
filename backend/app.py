# filepath: c:\Users\rodri\OneDrive\Documentos\GitHub\hackaton_infinity\backend\app.py
# backend/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
from usuario import carregar_usuarios, salvar_usuarios, Usuario

app = Flask(__name__)

CORS(app, supports_credentials=True, resources={r"/*": {"origins": [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5001",
    "http://127.0.0.1:5001",
    "http://localhost:5000",
    "http://127.0.0.1:5000",
    "http://127.0.0.1:5000/login"
]}})  # Permite acesso do frontend

@app.route('/dashboard', methods=['GET'])
def index():
    return "Servidor rodando!"

@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    senha = request.json.get('senha')
    usuarios = carregar_usuarios()
    usuario_encontrado = next((u for u in usuarios if u.email == email), None)

    if usuario_encontrado and Usuario.verificar_senha(usuario_encontrado, senha):
        return jsonify({"message": f"Bem-vindo, {usuario_encontrado.nome}!"})
    else:
        return jsonify({"message": "Email ou senha incorretos."}), 401

@app.route('/registrar', methods=['POST'])
def criar_usuario():
    data = request.json
    usuario = Usuario(**data)
    usuarios = carregar_usuarios()
    usuarios.append(usuario)
    salvar_usuarios(usuarios)
    return jsonify(usuario.to_dict()), 201

if __name__ == '__main__':
    app.run(debug=True)