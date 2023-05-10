//! Получаем данные про отработанное время
const workedDays = document.querySelector('#days')
const workedHours = document.querySelector('#hours')
const nonWorkingTime = document.querySelector('#non_working_time')
const nightWorked = document.querySelector('#night_work')
const hourlyRate = document.querySelector('#hourly_rate')
const mainSalaryNode = document.querySelector('#mainSalary')
const isKnownOnlyMainSalary = document.querySelector('#isKnownOnlyMainSalary')

const calcButton = document.querySelector('.calcButton')
const clearButton = document.querySelector('.clearButton')

//! Элементы для вывода данных
const pdfo = document.querySelector('.pdfo')
const millitary = document.querySelector('.millitary')
const u = document.querySelector('.u')
const totalSalary = document.querySelector('.total')

function calculateMainSalary() {
  const days = workedDays.value
  const hours = workedHours.value
  const overWorkedValue = nonWorkingTime.value
  const nightWorkedValue = nightWorked.value

  //* 1
  const workedTotal = days * hours
  //* 2
  const primarySalary = workedTotal * hourlyRate.value

  //* 3
  const nonWorkingTimeValue = overWorkedValue * hourlyRate.value * 2
  const nightWorkingTime = nightWorkedValue * hourlyRate.value * 1.13

  //* 4
  const mainSalary = primarySalary + nonWorkingTimeValue + nightWorkingTime

  return Math.round(mainSalary)
}

function calculateAllDues() {
  let mainSalary = calculateMainSalary()
  if (isKnownOnlyMainSalary.checked) {
    mainSalary = mainSalaryNode.value
  }

  const pdfoValue = (mainSalary - 1342) * 0.18
  const millitaryValue = (mainSalary / 100) * 1.5
  const uValue = pdfoValue + millitaryValue
  const totalSalaryValue = mainSalary - uValue

  pdfo.textContent = 'ПДФО: ' + Math.round(pdfoValue) + 'грн'
  millitary.textContent = 'Военный сбор: ' + Math.round(millitaryValue) + 'грн'
  u.textContent = 'Удержание: ' + Math.round(uValue) + 'грн'
  totalSalary.textContent = 'Выплата: ' + Math.round(totalSalaryValue) + 'грн'

  return {
    pdfo: pdfoValue,
    millitary: millitaryValue,
    u: uValue,
    totalSalary: totalSalaryValue,
  }
}

calcButton.addEventListener('click', () => {
  calculateAllDues()
})

clearButton.addEventListener('click', () => {
  workedDays.value = ''
  workedHours.value = ''
  nonWorkingTime.value = ''
  nightWorked.value = ''
  hourlyRate.value = ''
})
