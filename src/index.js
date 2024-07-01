import './styles.css';

class Calendar {
  constructor(options) {
    this.options = {
      options: options.options || [],
      guests: options.guests || [],
      availableHours: options.availableHours || [],
      backgroundColor: options.backgroundColor || 'white',
      buttonColor: options.buttonColor || '#6cd9d0',
      buttonHoverColor: options.buttonHoverColor || '#5cb8a8',
      hoverColor: options.hoverColor || '#f0f0f0',
      containerId: options.containerId
    };
    this.selectedDate = null;
    this.selectedHour = null;
    this.init();
  }

  init() {
    this.container = document.createElement('div');
    this.container.className = 'calendar-container';
    this.container.style.setProperty('--background-color', this.options.backgroundColor);
    this.container.style.setProperty('--button-color', this.options.buttonColor);
    this.container.style.setProperty('--button-hover-color', this.options.buttonHoverColor);
    this.container.style.setProperty('--hover-color', this.options.hoverColor);

    const title = document.createElement('h1');
    title.className = 'calendar-title';
    title.textContent = 'Select options and date';
    this.container.appendChild(title);

    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'calendar-date-input';

    const optionSelect = document.createElement('select');
    optionSelect.className = 'calendar-select option-select';
    this.options.options.forEach(option => {
      const opt = document.createElement('option');
      opt.value = option.value;
      opt.textContent = option.label;
      optionSelect.appendChild(opt);
    });
    optionsContainer.appendChild(optionSelect);

    const guestsSelect = document.createElement('select');
    guestsSelect.className = 'calendar-select option-select';
    this.options.guests.forEach(guest => {
      const opt = document.createElement('option');
      opt.value = guest.value;
      opt.textContent = guest.label;
      guestsSelect.appendChild(opt);
    });
    optionsContainer.appendChild(guestsSelect);

    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.className = 'calendar-select date-input';
    dateInput.addEventListener('change', (e) => this.handleDateChange(e.target.value));
    optionsContainer.appendChild(dateInput);

    this.container.appendChild(optionsContainer);

    const checkButton = document.createElement('button');
    checkButton.className = 'calendar-button';
    checkButton.textContent = 'Check availability';
    checkButton.addEventListener('click', () => this.checkAvailability());
    this.container.appendChild(checkButton);

    this.hoursContainer = document.createElement('div');
    this.container.appendChild(this.hoursContainer);

    document.getElementById(this.options.containerId).appendChild(this.container);
  }

  handleDateChange(date) {
    this.selectedDate = date;
    this.renderHours();
  }

  handleHourChange(hour) {
    this.selectedHour = hour;
    console.log(`Selected hour: ${hour}`);
  }

  renderHours() {
    this.hoursContainer.innerHTML = '';
    const hoursTitle = document.createElement('h2');
    hoursTitle.className = 'calendar-hours-title';
    hoursTitle.textContent = 'Available Hours';
    this.hoursContainer.appendChild(hoursTitle);

    const hoursList = document.createElement('ul');
    hoursList.className = 'calendar-hours-list';
    this.options.availableHours.forEach((hour) => {
      const hourItem = document.createElement('li');
      hourItem.className = 'calendar-hours-item';
      hourItem.textContent = hour;
      hourItem.addEventListener('click', () => this.handleHourChange(hour));
      hoursList.appendChild(hourItem);
    });
    this.hoursContainer.appendChild(hoursList);
  }

  checkAvailability() {
    console.log('Check availability clicked');
    console.log('Selected options:', {
      date: this.selectedDate,
      hour: this.selectedHour,
    });
  }
}

export default Calendar;
