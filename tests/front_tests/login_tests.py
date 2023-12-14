from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Firefox()

driver.get("https://assistant.westeurope.cloudapp.azure.com/login")

email_input = driver.find_element(By.ID, "email")
password_input = driver.find_element(By.ID, "password")
login_button = driver.find_element(By.ID, "login_button")
signup_button = driver.find_element(By.ID, "signup_button")


def input_correct():
    email_input.send_keys("youremail@example.com")
    time.sleep(1)
    password_input.send_keys("YourPassword!1")
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
