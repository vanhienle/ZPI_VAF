from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Firefox()

driver.get("https://iaff.nocservice.biz/login")

email_input = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/form/div[1]/input')
password_input = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/form/div[2]/input')
login_button = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/form/div[3]/div[2]/button')
signup_button = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/form/div[3]/div[1]/p/a')


def input_correct():
    email_input.send_keys("admin3@hmail.com")
    time.sleep(1)
    password_input.send_keys("12345678@")
    time.sleep(1)


def input_email_incorrect():
    email_input.send_keys("yo")
    time.sleep(1)


def input_password_incorrect():
    password_input.send_keys("Yo")
    time.sleep(1)


input_email_incorrect()
time.sleep(1)
input_password_incorrect()
time.sleep(1)
input_correct()
time.sleep(1)
login_button.click()
signup_button.click()

error_login = driver.find_element(By.ID, "not_correct")
assert "Email or password is not correct!" in error_login.text, "Error not found"

time.sleep(1)

driver.quit()
