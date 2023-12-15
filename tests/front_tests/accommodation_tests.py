from selenium import webdriver
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
import time

driver = webdriver.Firefox()

driver.get("https://iaff.nocservice.biz/accommodation")

destination_input = driver.find_element(By.ID, "destination_input")
dropdown = driver.find_element(By.ID, "city_dropdown")
'''
check_in_button = driver.find_element(By.ID, "check_in_button")
check_out_button = driver.find_element(By.ID, "check_out_button")
guest_input = driver.find_element(By.ID, "guest_input")
room_input = driver.find_element(By.ID, "room_input")
price_category_button = driver.find_element(By.ID, "price_category_button")
price_choice_button = driver.find_element(By.ID, "price_choice_button")
filters_button = driver.find_element(By.ID, "filters_button")
filters_choice_button = driver.find_element(By.ID, "filters_choice_button")
sort_button = driver.find_element(By.ID, "sort_button")
sort_choice_button = driver.find_element(By.ID, "sort_choice_button")
search_button = driver.find_element(By.ID, "search_button")
first_choice_button = driver.find_element(By.ID, "first_choice_button")
'''

destination_input.sendKeys("Warsaw")
time.sleep(2)
select = Select(dropdown)
select.select_by_visible_text("Warsaw")
time.sleep(1)
'''
check_in_button.click()
time.sleep(1)
check_out_button.click()
time.sleep(1)
guest_input.click()
time.sleep(1)
room_input.click()
time.sleep(1)
price_category_button.click()
time.sleep(1)
price_choice_button.click()
time.sleep(1)
filters_button.click()
time.sleep(1)
filters_choice_button.click()
time.sleep(1)
sort_button.click()
time.sleep(1)
sort_choice_button.click()
time.sleep(1)
search_button.click()
time.sleep(1)
first_choice_button.click()
time.sleep(1)
'''

driver.quit()
