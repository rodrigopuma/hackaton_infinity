import bcrypt
import json
import os
from datetime import datetime

ARQUIVO = 'usuarios.json'

class Usuario:
    _ultimo_id = 0  # Gerador simples de IDs incrementais

    def __init__(self, nome, email, senha, role='user', status='active', 
                 profile_picture='', bio='', location='', preferences=None,
                 created_at=None, last_login=None, id=None): 
        if id is None: 
            Usuario._ultimo_id += 1 
            self.id = Usuario._ultimo_id 
        else: 
            self.id = id 
            Usuario._ultimo_id = max(Usuario._ultimo_id, id)

        self.nome = nome 
        self.email = email
        self.senha = Usuario.hash_password(senha)
        self.role = role
        self.status = status
        self.profile_picture = profile_picture
        self.bio = bio
        self.location = location
        self.preferences = preferences or { 
            "language": "pt-BR", 
            "notifications": True,
            "theme": "light"
        } 
        self.created_at = created_at or datetime.utcnow().isoformat() 
        self.last_login = last_login or datetime.utcnow().isoformat() 

    @staticmethod
    def hash_password(senha):
        return bcrypt.hashpw(senha.encode('utf-8'), bcrypt.gensalt())

    def to_dict(self): # Converte o objeto para um dicionário
        return {
            "id": self.id,
            "nome": self.nome,
            "email": self.email,
            "senha": self.senha.decode('utf-8'),  # bcrypt gera bytes
            "role": self.role,
            "status": self.status,
            "profile_picture": self.profile_picture,
            "bio": self.bio,
            "location": self.location,
            "preferences": self.preferences,
            "created_at": self.created_at,
            "last_login": self.last_login
        }

    @classmethod
    def from_dict(cls, data):
        obj = cls(
            id=data['id'],
            nome=data['nome'],
            email=data['email'],
            senha=data['senha'],  # já está como hash
            role=data.get('role', 'user'),
            status=data.get('status', 'active'),
            profile_picture=data.get('profile_picture', ''),
            bio=data.get('bio', ''),
            location=data.get('location', ''),
            preferences=data.get('preferences'),
            created_at=data.get('created_at'),
            last_login=data.get('last_login')
        )
        obj.senha = data['senha'].encode('utf-8')  # converte a senha de volta para bytes
        Usuario._ultimo_id = max(Usuario._ultimo_id, data['id'])
        return obj

    @staticmethod
    def verificar_senha(self, senha):
        # Verifica se a senha fornecida corresponde ao hash armazenado
        return bcrypt.checkpw(senha.encode('utf-8'), self.senha)


# Funções auxiliares para manipulação do arquivo JSON
def carregar_usuarios():
    if not os.path.exists(ARQUIVO): # Verifica se o arquivo existe
        return []

    with open(ARQUIVO, 'r', encoding='utf-8') as f: # Abre o arquivo para leitura
        data = json.load(f) # Carrega os dados do arquivo JSON
        return [Usuario.from_dict(user) for user in data] # Converte cada dicionário em um objeto Usuario


def salvar_usuarios(lista_usuarios): # Salva a lista de usuários no arquivo JSON
    with open(ARQUIVO, 'w', encoding='utf-8') as f: # Abre o arquivo para escrita
        json.dump([user.to_dict() for user in lista_usuarios], f, ensure_ascii=False, indent=4) # Converte cada objeto Usuario em um dicionário e salva no arquivo JSON