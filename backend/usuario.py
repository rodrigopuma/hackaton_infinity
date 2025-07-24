# backend/usuario.py

import bcrypt
import json
import os
from datetime import datetime
import uuid # Usaremos para IDs mais robustos

ARQUIVO_USUARIOS = 'usuarios.json'

class Usuario:
    def __init__(self, nome, email, senha, id=None, **kwargs):
        self.id = id if id else str(uuid.uuid4())
        self.nome = nome
        self.email = email
        # O hash da senha é feito aqui, ao criar o usuário
        self.senha_hash = self.hash_password(senha)
        
        # Outros campos com valores padrão
        self.role = kwargs.get('role', 'Funcionário')
        self.bio = kwargs.get('bio', 'Novo membro da equipe Infinity!')
        self.photoUrl = kwargs.get('photoUrl', f"https://ui-avatars.com/api/?name={nome.replace(' ', '+')}")

    @staticmethod
    def hash_password(senha):
        """Cria um hash seguro para a senha fornecida."""
        return bcrypt.hashpw(senha.encode('utf-8'), bcrypt.gensalt())

    def verificar_senha(self, senha_para_verificar):
        """
        CORRIGIDO: Este é um método de instância, não estático.
        Ele compara uma senha em texto puro com o hash armazenado no objeto.
        """
        return bcrypt.checkpw(senha_para_verificar.encode('utf-8'), self.senha_hash)

    def to_dict(self):
        """
        Converte o objeto Usuario para um dicionário.
        IMPORTANTE: NUNCA inclua a senha ou o hash da senha aqui!
        """
        return {
            "id": self.id,
            "name": self.nome,
            "email": self.email,
            "role": self.role,
            "bio": self.bio,
            "photoUrl": self.photoUrl
        }
    
    @classmethod
    def from_dict(cls, data):
        """Cria uma instância de Usuario a partir de um dicionário (vindo do JSON)."""
        # Nota: A senha não é passada aqui, pois já vem hasheada
        user_obj = cls(
            id=data['id'],
            nome=data['name'],
            email=data['email'],
            senha="dummy_password_not_used", # A senha real não é necessária aqui
            role=data.get('role'),
            bio=data.get('bio'),
            photoUrl=data.get('photoUrl')
        )
        # Atribuímos o hash diretamente
        user_obj.senha_hash = data['senha_hash'].encode('utf-8')
        return user_obj

# --- Funções Auxiliares ---

def carregar_usuarios():
    """Carrega todos os usuários do arquivo JSON."""
    if not os.path.exists(ARQUIVO_USUARIOS):
        return {} # Usaremos um dicionário com emails como chave para busca rápida
    
    with open(ARQUIVO_USUARIOS, 'r', encoding='utf-8') as f:
        lista_de_usuarios_dict = json.load(f)
        # Converte a lista de dicts em um dict de objetos Usuario
        usuarios_obj = {u['email']: Usuario.from_dict(u) for u in lista_de_usuarios_dict}
        return usuarios_obj

def salvar_usuarios(dict_usuarios):
    """Salva o dicionário de usuários de volta no arquivo JSON."""
    lista_para_salvar = []
    for user_obj in dict_usuarios.values():
        # Antes de salvar, precisamos do dicionário completo, incluindo o hash
        full_dict = user_obj.to_dict()
        full_dict['senha_hash'] = user_obj.senha_hash.decode('utf-8')
        lista_para_salvar.append(full_dict)

    with open(ARQUIVO_USUARIOS, 'w', encoding='utf-8') as f:
        json.dump(lista_para_salvar, f, ensure_ascii=False, indent=4)