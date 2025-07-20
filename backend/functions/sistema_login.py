def menu():
    print('\n\033[1;33m[1]\033[m Cadastrar novo usuário\n'
          '\033[1;33m[2]\033[m Fazer login\n'
          '\033[1;33m[0]\033[m Sair\n')
    while True:
        try:
            choice = int(input('Escolha qual opção você deseja: '))
            if choice in (0,1,2):
                return choice
        except ValueError:
            pass
        print('Opção \033[1;31minválida\033[m. Escolha \033[1;33m0\033[m, \033[1;33m1\033[m ou \033[1;33m2\033[m.')

validar_s_n = lambda obj: obj.upper() in ('S','N')

def ler_usuarios():
    usuarios = []
    with open("usuarios.txt", "r") as arquivo: # "r" = read (ler os usuarios)
        for linha in arquivo:
            nome, senha = linha.strip().split(';')
            usuarios.append((nome, senha))
    return usuarios

def salvar_usuario(username, senha):
    with open("usuarios.txt", "a") as arquivo: # "a" = append (adicionar ao final)
        arquivo.write(f'{username};{senha}\n')
    print(f'Usuário "\033[1;31m{username}\033[m" cadastrado com a senha \033[1;31m{"*" * len(senha)}\033[m.')

def usuario_existe(username_prompt):
    return any(username_prompt == user for user, _ in ler_usuarios())
    
def cadastrar_usuario():
    while True:
        username = input('Digite seu nome de usuário: ').strip()
        if username == '':
            print('\nNome não pode ser vazio.\n')
        elif usuario_existe(username):
            print('\nEsse usuário já existe.\n')
        else:
            break
    while True:
        senha = input('Digite sua senha: ').strip()
        if senha == '':
            print('\nSenha não pode ser vazia.\n')
        else:
            break
    salvar_usuario(username, senha)

    return username

def fazer_login():
    usuarios = ler_usuarios()
    for tent in range(3):
        user = input('Usuário: ').strip()
        pwd = input('Senha: ').strip()
        if any(u == user and p == pwd for u,p in usuarios):
            print(f'Bem-vindo ao sistema de login, \033[1;31m{user}\033[m!')
            return True
        if tent == 2: 
            print('Úsuario ou senha inválidos. Suas tentativas \033[1;31macabaram\033[m')
            break
        print(f'Úsuario ou senha inválidos. Tente novamente, você tem \033[1;31m{2 - tent}\033[m tentativas.')
    
    return False