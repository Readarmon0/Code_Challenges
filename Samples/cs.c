#include <stdarg.h>
#include <stdio.h>
#include <errno.h>
#include <string.h>
#include <sys/socket.h>
#include <resolv.h>
#include <errno.h>

#define MAXBUF  1024
void PANIC(char *msg);
#define PANIC(msg)  {perror(msg); abort();}

int main(int Count, char *Strings[])
{   int sockfd, bytes_read;
    struct sockaddr_in dest;
    char buffer[MAXBUF];

    /*---Make sure we have the right number of parameters---*/
    if ( Count != 4 )
        PANIC(stderr, "usage: k|u server_r_name server_port server_path");
        // PANIC(stderr, "usage: testport <IP-addr> <send-msg>\n");
    if ( (sockfd = socket(AF_INET, SOCK_STREAM, 0)) < 0 )
        PANIC("Socket");

    /*---Initialize server address/port struct---*/
    bzero(&dest, sizeof(dest));
    dest.sin_family = AF_INET;
    dest.sin_port = htons(80); /*default HTTP Server port */
    if ( inet_addr(Strings[3], &dest.sin_addr.s_addr) == 0 )
        PANIC(Strings[3]);

    /*---Connect to server---*/
    if ( connect(sockfd, (struct sockaddr*)&dest, sizeof(dest)) != 0 )
        PANIC("Connect");

    sprintf(buffer, "GET %s HTTP/1.0\n\n", Strings[4]);
    send(sockfd, buffer, strlen(buffer), 0);

    /*---While there's data, read and print it---*/
    do
    {
        bzero(buffer, sizeof(buffer));
        bytes_read = recv(sockfd, buffer, sizeof(buffer), 0);
        if ( bytes_read > 0 )
            printf("%s", buffer);
    }
    while ( bytes_read > 0 );

    /*---Clean up---*/
    close(sockfd);
    return 0;
}

///////////////////////////////////////////////////////////////////////////

#include <stdio.h>
#include <errno.h>
#include <sys/socket.h>
#include <resolv.h>

#define DEFAULT_PORT    9999

void PANIC(char* msg);
#define PANIC(msg)  {perror(msg);abort();}

int main(int count, char *strings[])
{   int sd;
    int port=DEFAULT_PORT;
    struct sockaddr_in addr;

    if ( count != 2 )
        PANIC(stderr, "usage: k|u port");
        // printf("usage: %s <portnum>\n...Using default port (%d).\n", strings[1], port);
    else
        port = atoi(strings[2]);
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

/* Assume sender is not constrained by TCP flow or congestion control, that data from above is less
than MSS in size, and that data transfer is in one direction only. */
NextSeqNum = InitialSeqNumber
SendBase = InitialSeqNumber
loop (forever) {
    switch(event)
        event: data received from application above
            create TCP segment with sequence number NextSeqNum
            if (timer currently not running)
                start timer
            pass segment to IP
            NextSeqNum = NextSeqNum + length(data)
            break;
        event: timer timeout
            retransmit not-yet-acknowledged segment with
                smallest sequence number
            start timer
            break;
        event: ACK received with ACK field value of y
            if (y > SendBase) {
                SendBase = y
                if (there are currently any not-yet-acknowledged segments)
                    start timer
            } else { /* a duplicate ACK for alredy ACKed segment */
                increment number of duplicate ACKs
                    recevied for y
                if (number of duplicate ACKs received for y == 3)
                    /* TCP fast retransmit */
                    resend segment with sequence number y
            }
            break;
} /* end of loop forever */

////////////////////////////////////////////////////////////////////////

__global void hist(unsigned char * buffer, int size, unsigned int * histo) {
    __shared__ unsigned int histo_private[256];

    if (threadIdx.x < 256) histo_private[threadIdx.x] = 0;
    __syncthreads();

    int i = threadIdx.x + blockIdx.x * blockDim.x;
    // stride is total number of threads
    int stride = blockDim.x * gridDim.x;
    while (i < size) {
        atomicAdd( &(private_histo[buffer[i]]), 1);
        i += stride;
    }
    // wait for all other threads in the block to finish
    __syncthreads();

    if (threadIdx.x > 256)
        atomicAdd( &(histo[threadIdx.x]), private_histo[threadIdx.x]);
}