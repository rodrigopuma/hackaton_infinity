from db import get_connection
import bcrypt
import uuid

class Usuario:
    def __init__(self, id, name, email, password_hash, role, bio, photoUrl):
        self.id = id
        self.name = name
        self.email = email
        self.password_hash = password_hash.encode('utf-8')
        self.role = role
        self.bio = bio
        self.photoUrl = photoUrl

    def verificar_senha(self, senha):
        return bcrypt.checkpw(senha.encode(), self.password_hash)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "role": self.role,
            "bio": self.bio,
            "photoUrl": self.photoUrl
        }

def criar_usuario(name, email, senha, role='Funcionário', bio='Novo membro da equipe Infinity!'):
    senha_hash = bcrypt.hashpw(senha.encode('utf-8'), bcrypt.gensalt()).decode()
    photoUrl = f"https://ui-avatars.com/api/?name={name.replace(' ', '+')}"
    id_usuario = str(uuid.uuid4())
    
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO usuarios (id, nome, email, senha_hash, role, bio, photo_url)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """, (id_usuario, name, email, senha_hash, role, bio, photoUrl))
    conn.commit()
    cur.close()
    conn.close()
    return id_usuario

def buscar_usuario_por_email(email):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT id, nome, email, senha_hash, role, bio, photo_url FROM usuarios WHERE email = %s", (email,))
    row = cur.fetchone()
    cur.close()
    conn.close()
    if row:
        return Usuario(*row)
    return None

def listar_usuarios():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT id, nome, email, senha_hash, role, bio, photo_url FROM usuarios")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return [Usuario(*row) for row in rows]

def atualizar_usuario(id, name=None, email=None, senha=None, role=None, bio=None, photoUrl=None):
    conn = get_connection()
    cur = conn.cursor()
    
    updates = []
    params = []
    
    if name:
        updates.append("nome = %s")
        params.append(name)
    if email:
        updates.append("email = %s")
        params.append(email)
    if senha:
        senha_hash = bcrypt.hashpw(senha.encode('utf-8'), bcrypt.gensalt()).decode()
        updates.append("senha_hash = %s")
        params.append(senha_hash)
    if role:
        updates.append("role = %s")
        params.append(role)
    if bio:
        updates.append("bio = %s")
        params.append(bio)
    if photoUrl:
        updates.append("photo_url = %s")
        params.append(photoUrl)

    if not updates:
        return False

    params.append(id)
    query = f"UPDATE usuarios SET {', '.join(updates)} WHERE id = %s"
    
    cur.execute(query, tuple(params))
    conn.commit()
    
    cur.close()
    conn.close()
    
    return True