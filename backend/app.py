# backend/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
from usuario import criar_usuario, buscar_usuario_por_email, listar_usuarios, atualizar_usuario
from db import get_connection

# --- Configuração da Aplicação ---
app = Flask(__name__)
# Permite que o frontend em localhost:5001 acesse esta API
CORS(app, origins=['http://localhost:5001'], supports_credentials=True)

# --- Endpoints da API ---

@app.route('/', methods=['GET'])
def home():
    return "Servidor Rodando!!!"

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not data.get('nome') or not data.get('email') or not data.get('senha'):
        return jsonify({"message": "Dados incompletos."}), 400

    if buscar_usuario_por_email(data['email']):
        return jsonify({"message": "Email já cadastrado."}), 409

    criar_usuario(data['nome'], data['email'], data['senha'])

    return jsonify({"message": "Usuário cadastrado com sucesso!"}), 201


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('senha'):
        return jsonify({"message": "Email e senha são obrigatórios."}), 400

    usuario = buscar_usuario_por_email(data['email'])
    if not usuario or not usuario.verificar_senha(data['senha']):
        return jsonify({"message": "Credenciais inválidas."}), 401

    token = f"fake-jwt-token-for-{usuario.email}"

    return jsonify({
        "message": "Login realizado com sucesso!",
        "user": usuario.to_dict(),
        "token": token
    })

@app.route('/api/admin/usuarios', methods=['GET'])
def listar_usuarios_admin():
    usuarios = listar_usuarios()
    return jsonify([u.to_dict() for u in usuarios])

# --- Roda a Aplicação ---
if __name__ == '__main__':
    app.run(debug=True, port=5000)