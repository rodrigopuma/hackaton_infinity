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

@app.route('/api/profile', methods=['PUT'])
def update_profile():
    # Para saber QUEM está editando, vamos usar o token (simulado)
    # Em um app real, o token JWT conteria o ID do usuário.
    # Aqui, vamos pegar o email do nosso token falso.
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({"message": "Token de autorização faltando ou inválido."}), 401

    token = auth_header.split(" ")[1]
    # Extraindo o email do nosso token falso "fake-jwt-token-for-email@exemplo.com"
    try:
        email = token.split('-')[-1]
        usuario_atual = buscar_usuario_por_email(email)
        if not usuario_atual:
            return jsonify({"message": "Usuário do token não encontrado."}), 404
    except:
        return jsonify({"message": "Formato de token inválido."}), 401
    
    # Agora, pegamos os dados que o usuário quer atualizar
    data = request.get_json()
    nome = data.get('name')
    bio = data.get('bio')
    
    # Usamos a função que já existe para atualizar no banco
    sucesso = atualizar_usuario(id=usuario_atual.id, name=nome, bio=bio)

    if sucesso:
        usuario_atualizado = buscar_usuario_por_email(usuario_atual.email)
        return jsonify({
            "message": "Perfil atualizado com sucesso!",
            "user": usuario_atualizado.to_dict()
        })
    else:
        return jsonify({"message": "Falha ao atualizar o perfil."}), 500

# --- Roda a Aplicação ---
if __name__ == '__main__':
    app.run(debug=True, port=5000)