// project_euler_c.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include <iostream>
#include <fstream>
#include <string>

using namespace std;


int main() {
	int * tokens = new int[1000];
	int i = 1, j;

	string line;
	ifstream myfile("example_8.txt");
	char * cstr = new char[line.length() + 1];
	if (myfile.is_open()) {
		while (getline(myfile, line)) {
			strcpy_s(cstr, line.length() + 1, line.c_str());
			for (j = 0; j < 50; j++) {
				tokens[i] = atoi(cstr + j);
				i++;
			}
		}
		myfile.close();
	}

	int prdct, max = 0;
	for (i = 1; i <= 1000 - 13; i++) {
		cout << tokens[i] << endl;
		prdct = tokens[i] * tokens[i + 1] * tokens[i + 2] * tokens[i + 3] * tokens[i + 4] * tokens[i + 5] * tokens[i + 6] * tokens[i + 7] * tokens[i + 8] * tokens[i + 9] * tokens[i + 10] * tokens[i + 11] * tokens[i + 12];
		if (max < prdct) {
			max = prdct;
		}
	}
	cout << max << endl;
	return 0;
}

/*
int main () {
	int * tokens = new int[400];
	int i = 0, j;

	string line;
	ifstream myfile ("example_11.txt");
	char * cstr = new char[line.length() + 1];
	char * ctxt = new char[line.length() + 1];
	if (myfile.is_open()) {
		while (getline(myfile, line)) {
			strcpy_s(cstr, line.length() + 1, line.c_str());
			strtok_s(cstr, " ", &ctxt);
			tokens[20 * i + 1] = atoi(cstr);
			for (j = 1; j < 20; j++) {
				cstr = strtok_s(NULL, " ", &ctxt);
				tokens[20 * i + j + 1] = atoi(cstr);
			}
			i++;
		}
		myfile.close();
	}

	int prdct, max = 0;
	for (i = 0; i < 20; i++) {
		for (j = 1; j <= 16; j++) {
			prdct = tokens[i * 20 + j] * tokens[i * 20 + j + 1] * tokens[i * 20 + j + 2] * tokens[i * 20 + j + 3];
			if (max < prdct)
				max = prdct;
		}
	}
	for (i = 0; i < 16; i++) {
		for (j = 1; j <= 20; j++) {
			prdct = tokens[i * 20 + j] * tokens[i * 20 + j + 20] * tokens[i * 20 + j + 40] * tokens[i * 20 + j + 60];
			if (max < prdct)
				max = prdct;
		}
	}
	for (i = 0; i < 16; i++) {
		for (j = 1; j <= 16; j++) {
			prdct = tokens[i * 20 + j] * tokens[i * 20 + j + 21] * tokens[i * 20 + j + 42] * tokens[i * 20 + j + 63];
			if (max < prdct)
				max = prdct;
		}
		for (j = 4; j <= 20; j++) {
			prdct = tokens[i * 20 + j] * tokens[i * 20 + j + 19] * tokens[i * 20 + j + 38] * tokens[i * 20 + j + 57];
			if (max < prdct)
				max = prdct;
		}
	}

	cout << max << endl;
	return 0;
}
*/