# filepath: c:\Users\rodri\OneDrive\Documentos\GitHub\hackaton_infinity\backend\app.py
# backend/app.py

from usuario import carregar_usuarios, salvar_usuarios, Usuario

def registrar():
    usuarios = carregar_usuarios()
    email = input("Digite seu email: ")
    if any(u.email == email for u in usuarios):
        print("Email já cadastrado.")
        return
    name = input("Digite seu nome: ")
    senha = input("Digite sua senha: ")
    novo_usuario = Usuario(name=name, email=email, password=senha)
    usuarios.append(novo_usuario)
    salvar_usuarios(usuarios)
    print("Usuário registrado com sucesso!")

def main():
    print("1 - Registrar")
    print("2 - Login")
    escolha = input("Escolha uma opção: ")
    if escolha == "1":
        registrar()
    elif escolha == "2":
        login()
    else:
        print("Opção inválida.")

def login():
    usuarios = carregar_usuarios()
    email = input("Digite seu email: ")
    senha = input("Digite sua senha: ")

    usuario_encontrado = next((u for u in usuarios if u.email == email), None)

    if usuario_encontrado and Usuario.verificar_senha(usuario_encontrado, senha):
        print(f"Bem-vindo, {usuario_encontrado.name}!")
    else:
        print("Email ou senha incorretos.")

if __name__ == "__main__":
    main()