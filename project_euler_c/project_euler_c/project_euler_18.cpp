#include "stdafx.h"
#include <iostream>
#include <fstream>
#include <string>

using namespace std;


int sum_tri(int * tokens) {
	int i, j;
	int * sums = new int[120];
	for (i = 1; i <= 120; i++)
		sums[i] = tokens[i];

	for (i = 2; i <= 15; i++) {
		sums[i * (i + 1) / 2 - i + 1] += sums[(i - 1) * i / 2];
		sums[i * (i + 1) / 2] += sums[(i - 1) * i / 2];
	}

	for (i = 3; i <= 15; i++) {
		for (j = i * (i + 1) / 2 - i + 2; j <= i * (i + 1) / 2 - 1; j++) {
			if (sums[j - i] > sums[j - i + 1])
				sums[j] += sums[j - i];
			else
				sums[j] += sums[j - i + 1];
		}
	}

	int tkn_cnt = 1;
	for (i = 1; i <= 15; i++) {
		for (j = 1; j <= i; j++) {
			cout << sums[tkn_cnt] << " ";
			tkn_cnt++;
		}
		cout << endl;
	}

	int max = 0;
	for (i = 106; i <= 120; i++) {
		if (max < sums[i])
			max = sums[i];
	}

	return max;
}

int main() {
	int i = 1;
	char * token;
	char * next_token;
	int * tokens = new int[120];

	string line;
	ifstream myfile("input_18.txt");
	char * cstr = new char[line.length() + 1];
	if (myfile.is_open()) {
		while (getline(myfile, line)) {
			strcpy_s(cstr, line.length() + 1, line.c_str());
			token = strtok_s(cstr, " ", &next_token);
			while (token) {
				tokens[i] = atoi(token);
				cout << tokens[i] << " ";
				token = strtok_s(NULL, " ", &next_token);
				i++;
			}
			cout << endl;
		}
		myfile.close();
	}

	cout << sum_tri(tokens) << endl;

	return 0;
}