# backend/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
from usuario import Usuario, carregar_usuarios, salvar_usuarios

# --- Configuração da Aplicação ---
app = Flask(__name__)
# Permite que o frontend em localhost:5001 acesse esta API
CORS(app, origins=['http://localhost:5001'], supports_credentials=True)


# --- Endpoints da API ---

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not data.get('nome') or not data.get('email') or not data.get('senha'):
        return jsonify({"message": "Dados incompletos."}), 400

    usuarios = carregar_usuarios()
    if data['email'] in usuarios:
        return jsonify({"message": "Email já cadastrado."}), 409

    # Cria uma nova instância de usuário (a senha será hasheada no __init__)
    novo_usuario = Usuario(nome=data['nome'], email=data['email'], senha=data['senha'])
    
    # Adiciona ao nosso "banco de dados" e salva
    usuarios[novo_usuario.email] = novo_usuario
    salvar_usuarios(usuarios)

    return jsonify({"message": "Usuário cadastrado com sucesso!"}), 201


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('senha'):
        return jsonify({"message": "Email e senha são obrigatórios."}), 400

    usuarios = carregar_usuarios()
    usuario_encontrado = usuarios.get(data['email'])

    # Verifica se o usuário existe E se a senha está correta
    if not usuario_encontrado or not usuario_encontrado.verificar_senha(data['senha']):
        return jsonify({"message": "Credenciais inválidas."}), 401

    # Login bem-sucedido! Prepara a resposta para o frontend
    token = "fake-jwt-token-for-" + usuario_encontrado.email # Token de mentira para o hackathon
    
    # Usa o método to_dict() para pegar os dados seguros do usuário (sem a senha)
    user_data = usuario_encontrado.to_dict()

    return jsonify({
        "message": "Login realizado com sucesso!",
        "user": user_data,
        "token": token
    })

# --- Roda a Aplicação ---
if __name__ == '__main__':
    app.run(debug=True, port=5000)