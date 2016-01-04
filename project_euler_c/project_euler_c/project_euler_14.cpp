#include "stdafx.h"
#include <iostream>
#include <fstream>
#include <string>

using namespace std;


void write(int * values, int num, ofstream &output) {
	for (int i = 1; i <= num; i++) {
		output << values[i] << " ";
	}
	output << endl;
}

int main() {
	int max_cnt = 0;
	int max_num = 0;

	ofstream output("output_14.txt");
	if (output.is_open()) {
		int current;
		int seq_cnt;
		int * sequence = new int[300000000];
		for (int i = 1; i < 1000000; i++) {
			current = i;
			seq_cnt = 1;
			sequence[seq_cnt] = current;

			while (current > 1) {
				if (fmod(current, 2) == 0) {
					current /= 2;
				}
				else {
					current = 3 * current + 1;
				}
				seq_cnt++;
				sequence[seq_cnt] = current;
			}

			if (max_cnt < seq_cnt) {
				max_cnt = seq_cnt;
				max_num = i;
			}
			write(sequence, seq_cnt, output);
		}

		output << "Max Cnt:" << max_cnt << endl;
		output << "Max Num:" << max_num << endl;
		output.close();
	}
	return 0;
}