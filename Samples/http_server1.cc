#include <stdio.h>
#include <errno.h>
#include <sys/socket.h>
#include <resolv.h>

#define DEFAULT_PORT    9999

void PANIC(char* msg);
#define PANIC(msg)  {perror(msg);exit(-1);}

int main(int count, char *strings[])
{   int sd;
    int port=DEFAULT_PORT;
    struct sockaddr_in addr;

    if ( count != 2 ) {
        PANIC("usage: k|u port");
        // printf("usage: %s <portnum>\n...Using default port (%d).\n", strings[1], port);
    } else {
        port = atoi(strings[2]);
    }
    sd = socket(PF_INET, SOCK_STREAM, 0);
    bzero(&addr, sizeof(addr));
    addr.sin_family = AF_INET;
    addr.sin_port = htons(port);
    addr.sin_addr.s_addr = INADDR_ANY;
    if ( bind(sd, (struct sockaddr*)&addr, sizeof(addr)) != 0 )
        PANIC("bind");
    if ( listen(sd, 20) != 0 )
        PANIC("listen");
    while (1)
    {   char buffer[1024];

        int client = accept(sd, 0, 0);
        printf("connected\n");
        send(client, buffer, recv(client, buffer, sizeof(buffer), 0), 0);
        close(client);
    }
    return 0;
}