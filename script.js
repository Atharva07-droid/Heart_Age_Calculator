function calculateHeartAge() {
    // Get the input values
    var age = parseInt(document.getElementById('age').value);
    var gender = document.getElementById('gender').value;
    var ethnicGroup = document.getElementById('ethnicGroup').value;
    var height = parseInt(document.getElementById('height').value);
    var weight = parseInt(document.getElementById('weight').value);
    var smoking = document.getElementById('smoking').value;
    var heartAge = age; // Start with age as the base

    // Validate age
    if (age < 30 || age > 95 || !age) {
        alert('Age must be a valid number between 30 and 95.');
        return;
    }

    if (!height || !weight) {
        alert('Please enter both height and weight.');
        return;
    }
    height = parseInt(height);
    weight = parseInt(weight);

    if (smoking === 'yes') {
        var smokingStartAge = document.getElementById('smokingStartAge').value;
        var cigarettesPerDay = document.getElementById('cigarettesPerDay').value;

        if (!smokingStartAge || !cigarettesPerDay) {
            alert('Please complete all smoking-related questions.');
            return;
        }

        switch (smokingStartAge) {
            case 'under15':
                heartAge += 5;
                break;
            case '15-20':
                heartAge += 4;
                break;
            case '21-30':
                heartAge += 3;
                break;
            case 'over30':
                heartAge += 2;
                break;
        }

        switch (cigarettesPerDay) {
            case '01-05':
                heartAge += 2;
                break;
            case '06-10':
                heartAge += 3;
                break;
            case '11-20':
                heartAge += 4;
                break;
            case 'moreThan20':
                heartAge += 5;
                break;
        }
    }

    // Get other values
    var diabetes = document.getElementById('diabetes').value;
    var hypertension = document.getElementById('hypertension').value;
    var hypertensionMedication = document.getElementById('hypertensionMedication').value;
    var arthritis = document.getElementById('arthritis').value;
    var kidneyDisease = document.getElementById('kidneyDisease').value;
    var familyHistory = document.getElementById('familyHistory').value;

    // Family history of cardiovascular disease
    switch (familyHistory) {
        case 'coronaryArteryDisease':
            heartAge += 4;
            break;
        case 'peripheralArteryDisease':
            heartAge += 4;
            break;
        case 'stroke':
            heartAge += 4;
            break;
        case 'prematureCoronaryDisease':
            heartAge += 5;
            break;
    }

    // Symptoms (Multiple Choice)
    var symptoms = document.getElementsByName('symptoms');
    var selectedSymptoms = [];
    for (var i = 0; i < symptoms.length; i++) {
        if (symptoms[i].checked) {
            selectedSymptoms.push(symptoms[i].value);
        }
    }
    if (selectedSymptoms.length === 0) {
        alert('Please select at least one symptom.');
        return;
    }


    var atrialFibrillation = document.getElementById('atrialFibrillation').value;
    var lipidProfile = document.getElementById('lipidProfile').value;
    var exercise = document.getElementById('exercise').value;
    var diet = document.getElementById('diet').value;

    // Add weights based on gender
    if (gender === 'male') {
        heartAge += 3;
    } else if (gender === 'female') {
        heartAge += 2;
    }

    // Add weights based on ethnic group
    if (ethnicGroup === 'groupA') {
        heartAge += 4;
    } else if (ethnicGroup === 'groupB') {
        heartAge += 3;
    } else if (ethnicGroup === 'groupC') {
        heartAge += 2;
    }

    // Add weight based on BMI (Body Mass Index)
    var bmi = weight / ((height / 100) ** 2);
    if (bmi > 30) {
        heartAge += 5;
    } else if (bmi > 25) {
        heartAge += 3;
    } else {
        heartAge += 1;
    }

    // Add weights for health conditions
    if (diabetes === 'yes') heartAge += 5;
    if (hypertension === 'yes') heartAge += 4;
    if (hypertensionMedication === 'yes') heartAge += 3;
    if (arthritis === 'yes') heartAge += 2;
    if (kidneyDisease === 'yes') heartAge += 4;

    // Add weights for symptoms
    if (selectedSymptoms.includes('Shortness of breath')) heartAge += 3;
    if (selectedSymptoms.includes('Chest pain')) heartAge += 4;
    if (selectedSymptoms.includes('Persistent coughing')) heartAge += 2;
    if (selectedSymptoms.includes('Fatigue')) heartAge += 2;

    // "None of the above" should negate all other symptoms
    if (selectedSymptoms.includes('None')) {
        heartAge -= (selectedSymptoms.length - 1) * 2; // Adjust based on your logic
    }

    // Add weights for other conditions
    if (atrialFibrillation === 'yes') heartAge += 4;
    if (lipidProfile === 'high') heartAge += 5;
    if (lipidProfile === 'low') heartAge += 2;

    // Add weights for exercise
    switch (exercise) {
        case 'daily':
            heartAge -= 0;
            break;
        case 'severalTimes':
            heartAge -= 2;
            break;
        case 'onceAWeek':
            heartAge -= 3;
            break;
        case 'rarely':
            heartAge += 4;
            break;
        case 'never':
            heartAge += 5;
            break;
    }

    // Add weights for diet
    switch (diet) {
        case 'balanced':
            heartAge -= 0;
            break;
        case 'moderate':
            heartAge += 1;
            break;
        case 'unhealthy':
            heartAge += 3;
            break;
        case 'veryUnhealthy':
            heartAge += 5;
            break;
    }

    // Display the result
    document.getElementById('result').innerText = "Your calculated heart age is: " + heartAge;
}

function toggleSmokingQuestions() {
    var smoking = document.getElementById('smoking').value;
    var smokingDetails = document.getElementById('smokingDetails');

    if (smoking === 'yes') {
        smokingDetails.style.display = 'block';
    } else {
        smokingDetails.style.display = 'none';
    }
}

// Add form validation before calculation
document.getElementById('heartAgeForm').addEventListener('submit', function(event) {
    var age = parseInt(document.getElementById('age').value);
    var gender = document.getElementById('gender').value;
    var ethnicGroup = document.getElementById('ethnicGroup').value;
    var smoking = document.getElementById('smoking').value;

    // Check if all fields are filled
    if (!age || !gender || !ethnicGroup || !smoking) {
        alert('Please fill out all required fields.');
        event.preventDefault(); // Prevent form submission
        return;
    }

    // Additional age range validation
    if (age < 30 || age > 95) {
        alert('Age must be between 30 and 95.');
        event.preventDefault(); // Prevent form submission
        return;
    }

    // Check for smoking-related fields if smoking is selected
    if (smoking === 'yes') {
        var smokingStartAge = document.getElementById('smokingStartAge').value;
        var cigarettesPerDay = document.getElementById('cigarettesPerDay').value;

        if (!smokingStartAge || !cigarettesPerDay) {
            alert('Please complete all smoking-related questions.');
            event.preventDefault(); // Prevent form submission
            return;
        }
    }
});