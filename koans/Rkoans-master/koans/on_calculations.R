# R can be used to perform simple aritmetic calculations

# Basic maths operators

# R can add and take away!
expect_that(1 + 1, equals(2))
expect_that(1 - 1, equals(0))

# And multiply and divide..

expect_that(10 * 9, equals(90))
expect_that(4096 / 16, equals(256))

# And take powers:

expect_that(200 ^ 2, equals(40000))

# The remainder of division is very important!

expect_that(100 %% 10, equals(0))
expect_that(10 %% 3, equals(1))
expect_that(256 %% 2, equals(0))

# Other maths operations use functions
# a function is written as a function_name with arguments to the function in parentheses:
# exponentials, logs and squareroots:

expect_that(sqrt(40000), equals(200))
expect_that(log10(10000), equals(4))
expect_that(exp(2), equals(7.38905609893))
expect_that(log(exp(3)), equals(3)) # functions can be nested

# What do these functions do?

expect_that(abs(-100), equals(100))
expect_that(ceiling(6.03), equals(7))
expect_that(floor(8.97), equals(8))
expect_that(trunc(pi), equals(3))
expect_that(sign(12), equals(1))
expect_that(sign(0), equals(0))
expect_that(sign(-12), equals(-1))

# Some functions can take more than one argument:
expect_that(round(pi, digits = 3), equals(3.142))
expect_that(signif(pi, digits = 3), equals(3.14))


