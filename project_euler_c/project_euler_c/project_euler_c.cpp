// project_euler_c.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include <iostream>
#include <fstream>
#include <string>

using namespace std;

/*
class grid {
private:
	int dim_;
	bool * down_;
	bool * right_;
	bool down(int pos);
	bool right(int pos);
	int explore(int pos);
public:
	grid(int dim);
	int explore();
};

bool grid::down(int pos) {
	return down_[pos];
}

bool grid::right(int pos) {
	return right_[pos];
}

int grid::explore(int pos) {
	if (down_[pos] && right_[pos])
		return explore(pos + dim_) + explore(pos + 1);
	else
		return 1;
}

grid::grid(int dim) {
	dim_ = dim;
	down_ = new bool[dim * dim];
	right_ = new bool[dim * dim];
	for (int i = 1; i <= dim * dim; i++) {
		if (i / (dim * (dim - 1) + 1) != 1) {
			down_[i] = true;
		} else {
			down_[i] = false;
		}
		if (i % dim != 0) {
			right_[i] = true;
		}
		else {
			right_[i] = false;
		}
	}
}

int grid::explore() {
	return explore(1 + dim_) + explore(1 + 1);
}
*/


int explore(int pos) {
	if (pos / 421 == 0 && pos % 21 != 0)
		return explore(pos + 21) + explore(pos + 1);
	else
		return 1;
}

int main() {
	int grid[21][21];

	int i, j;
	for (i = 0; i < 21; i++) {
		grid[0][i] = 1;
		grid[i][0] = 1;
	}
	for (i = 1; i < 21; i++) {
		for (j = i; j < 21; j++) {
			grid[i][j] = grid[i][j - 1] + grid[i - 1][j - 1];
		}
	}

	cout << grid[20][20] << endl;
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