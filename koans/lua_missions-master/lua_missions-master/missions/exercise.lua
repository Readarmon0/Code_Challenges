--[[
  EXERCISE: Monkey-patching strings

  With all you have learnt now, you should be able to do this exercise

  Add the necessary code below so that the test at the end passes

]]

-- INSERT YOUR CODE HERE

function string:starts_with(quote)
  value = true
  for i = 1, #quote do
    if self[i] ~= quote[i] then
      value = false
      break
    end
  end
  return value
end

function string:ends_with(quote)
  value = true
  for i = 0, #quote - 1 do
    if self[#self - i] ~= quote[#quote - i] then
      value = false
      break
    end
  end
  return value
end

-- END OF CODE INSERT

function test_starts_with()
  local str = "Lua is awesome"

  assert_true(str:starts_with("L"))
  assert_true(str:starts_with("Lua"))
  assert_true(str:starts_with("Lua is"))
end

function test_ends_with()
  local str = "Lua is awesome"

  assert_true(str:ends_with("e"))
  assert_true(str:ends_with("some"))
  assert_true(str:ends_with("awesome"))
end

-- hint: string == getmetatable("").__index








