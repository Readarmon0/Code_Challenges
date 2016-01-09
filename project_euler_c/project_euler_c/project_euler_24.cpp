#include "stdafx.h"
#include <iostream>
#include <fstream>
#include <string>

using namespace std;


void perm_loop(int dgt, int num, int dgt_cnt, int & num_cnt, char * perm, char * prev) {
	int i, j;

	for (i = 0; i < dgt; i++) {
		int dgt_char = 48;
		bool dgt_flag = false;
		bool prev_flag = false;

		for (j = 0; j < dgt_cnt; j++) {
			if (dgt_char == perm[j]) {
				dgt_char++;
			} else {
				dgt_flag = true;
			}
		}
		if (dgt_flag)
			perm[dgt_cnt - 1] = dgt_char;

		if (dgt_cnt < dgt && num_cnt < num)
			perm_loop(dgt, num, dgt_cnt + 1, num_cnt, perm, prev);
		else if (dgt_cnt == dgt) {
			for (i = 0; i < dgt_cnt; i++) {
				if (perm[i] != prev[i])
					prev_flag = true;
			}
			if (prev_flag) {
				num_cnt++;
				for (i = 0; i < dgt_cnt; i++) {
					prev[i] = perm[i];
					cout << perm[i];
				}
				cout << endl;
			}
		}
	}
}

	/*
	if (num == num_cnt || dgt == dgt_cnt) {
		for (int i = 0; i < dgt_cnt; i++)
			cout << perm[i];
		cout << endl;
		num_cnt++;
		return;
	}
	*/

	// char dgt_char;
	// bool dgt_flag;
		/*
		dgt_char = 48;
		dgt_flag = false;
		for (j = 0; j < dgt_cnt; j++) {
			if (dgt_char == perm[i]) {
				dgt_char++;
				dgt_flag = true;
				break;
			}
		}
		
		if (!dgt_flag)
			perm[i] = dgt_char;
		*/

void perm(int dgt, int num) {
	char * perm = new char[dgt];
	char * prev = new char[dgt];
	int num_cnt = 0;

	perm_loop(dgt, num, 0, num_cnt, perm, prev);
}

int main() {
	perm(3, 6);
	return 0;
}