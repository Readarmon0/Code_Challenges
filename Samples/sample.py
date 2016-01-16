from socket import *
serverName = 'servername'
serverPort = 12000
clientSocket = socket(AF_INET, SOCK_STREAM)
clientSocket.connect((serverName, serverPort))
sentence = raw_input('Input lowercase sentence:')
clientSocket.send(sentence)
modifiedSentence = clientSocket.recv(1024)
print 'From Server:', modifiedSentence
clientSocket.close()

from socket import *
serverPort = 12000
serverSocket = socket(AF_INET, SOCK_STREAM)
serverSocket.bind(('', serverPort))
serverPocket.listen(1)
print 'Ther server is ready to receive'
while 1:
	connectionSocket, addr = serverSocket.accept()
	sentence = connectionSocket.recv(1024)
	capitalizedSentence = sentence.upper()
	connectionSocket.send(captializedSentence)
	connectionSocket.close()