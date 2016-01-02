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
	for (i = 1; i <= 1000; i++) {
		prdct = tokens[i] * tokens[i + 1] * tokens[i + 2] * tokens[i + 3] * tokens[i + 4] * tokens[i + 5] * tokens[i + 6] * tokens[i + 7] * tokens[i + 8] * tokens[i + 9] * tokens[i + 10] * tokens[i + 11] * tokens[i + 12];
		if (max < prdct) {
			cout << i << endl;
			max = prdct;
		}
	}
	cout << max << endl;
	return 0;
}