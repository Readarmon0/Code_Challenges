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