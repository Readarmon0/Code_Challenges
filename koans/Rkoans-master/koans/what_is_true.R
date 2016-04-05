# TRUE is TRUE, FALSE is FALSE
expect_that(TRUE, equals(TRUE))
expect_that(FALSE,  equals(FALSE))

# Use is. functions to check for data types
expect_that(is.numeric(1), is_true())
expect_that(is.character('a'), is_true())
expect_that(is.null(NULL), is_true())
expect_that(is.na(NA), is_true())

# Boolean tests
expect_that(2,  equals(2))
expect_that(1 > 0,  is_true())
expect_that(2 < 3,  is_true())
expect_that(1 >= 1,  is_true())
expect_that(2 <= 2,  is_true())


# zeros and ones map to boolean values
expect_that(TRUE == 1, is_true())
expect_that(FALSE == 0,   is_true())

