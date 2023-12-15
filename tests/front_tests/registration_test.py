from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Firefox()

driver.get("https://iaff.nocservice.biz/sign-up")

username_input = driver.find_element(By.XPATH, '//*[@id="name"]')
email_input = driver.find_element(By.XPATH, '//*[@id="email"]')
password_input = driver.find_element(By.XPATH, '//*[@id="password"]')
confirm_password_input = driver.find_element(By.XPATH, '//*[@id="repeat-password"]')
submit_button = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[2]/div[2]/button')


def input_correct():
    username_input.send_keys("YourUsername")
    time.sleep(1)
    email_input.send_keys("youremail@example.com")
    time.sleep(1)
    password_input.send_keys("YourPassword!1")
    time.sleep(1)
    confirm_password_input.send_keys("YourPassword!1")
    time.sleep(1)


def input_name_incorrect():
    username_input.send_keys("Y")
    time.sleep(1)


def input_email_incorrect():
    email_input.send_keys("youremail")
    time.sleep(1)


def input_password_incorrect():
    password_input.send_keys("YourPassword")
    time.sleep(1)


def input_repeat_incorrect():
    confirm_password_input.send_keys("YourPasswor")
    time.sleep(1)


input_name_incorrect()
time.sleep(1)
input_email_incorrect()
time.sleep(1)
input_password_incorrect()
time.sleep(1)
input_repeat_incorrect()
time.sleep(1)
input_correct()
time.sleep(1)
submit_button.click()

error_name = driver.find_element(By.ID, "error_name")
error_email = driver.find_element(By.ID, "error_email")
error_password = driver.find_element(By.ID, "error_password")
error_repeat = driver.find_element(By.ID, "error_repeat")
assert "Name must be between 1 and 30 characters, containing only letters and hyphens!" in error_name.text, \
    "Name is correct"
assert "Email must be between 3 and 50 characters and have a valid format!" in error_email.text, \
    "Email is correct"
assert "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, " \
       "one number, and one special character!" in error_password.text, "Password is correct"
assert "Passwords do not match!" in error_repeat.text, "Repeated password is correct"

time.sleep(1)

driver.quit()
