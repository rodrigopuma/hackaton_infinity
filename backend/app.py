from functions.sistema_login import (
    menu, validar_s_n,
    cadastrar_usuario, fazer_login
)

def login(loop='On'):
    while loop == 'On': # Loop para manter o menu ativo
        print('\n\033[1;34mSistema de Login\033[m')
        choice = menu() # Chama a função menu para exibir as opções
        
        if choice == 1: # Cadastrar usuario
            while True: 
                cadastrar_usuario() # Chama a função para cadastrar usuário
                print('\n\033[1;32mUsuário cadastrado com sucesso!\033[m')
                continuar = input('\nDeseja cadastrar outro usuario? [\033[1;32mS\033[m/\033[1;32mN\033[m]: ').upper().strip()
                while validar_s_n(continuar) is False: # Validação da entrada
                    continuar = input('Entrada inválida selecione [\033[1;32mS\033[m/\033[1;32mN\033[m]: ').upper().strip()
                if continuar == 'S': continue # Se o usuário quiser cadastrar outro, continua o loop
                else: break

            

        elif choice == 2: # Fazer Login
            fazer_login() # Chama a função para fazer login
            # Após o login, leva para o menu principal do sistema
            print('\n\033[1;32mLogin realizado com sucesso!\033[m')

        elif choice == 0: # Sair
            break

        continuar = input('\nDeseja voltar ao menu inicial? [\033[1;32mS\033[m/\033[1;32mN\033[m]: ').upper().strip()

        while validar_s_n(continuar) is False: # Validação da entrada
            continuar = input('Entrada inválida selecione [\033[1;32mS\033[m/\033[1;32mN\033[m]: ').upper().strip()
        
        if continuar == 'S':
            pass
        else:
            loop = 'Off'
            break

login()  # Inicia o sistema de login