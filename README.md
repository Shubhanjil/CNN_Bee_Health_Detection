# CNN_Bee_Health_Detection
Convolutional Neural Network (CNN) model to classify honey bee images as either "healthy" or "unhealthy" based on visual characteristics. The model was trained on the Honey Bee Annotated Images dataset from Kaggle, containing 5,172 labeled images.

## Step-by-Step Implementation Guide
### Step 1: Environment Setup
Open Google Colab in your browser
Create a new notebook
Ensure GPU acceleration is enabled in notebook settings
Install required packages using pip

### Step 2: Data Acquisition
Access the Kaggle dataset through the kagglehub library
Download the "Honey Bee Annotated Images" dataset
Verify dataset download and explore the file structure
Check the CSV file containing image labels and health status

### Step 3: Data Preparation
Create organized directory structure for training and validation data
Split the dataset into training (80%) and validation (20%) sets
Copy images to respective directories based on their health labels
Verify image counts in each directory

### Step 4: Data Preprocessing
Set up image data generators with augmentation techniques
Configure image resizing to 128x128 pixels
Apply data augmentation (rotation, shifting, zooming, flipping)
Normalize pixel values to 0-1 range
Create data generators for training and validation

### Step 5: Model Architecture Design
Design a sequential CNN model with multiple convolutional layers
Add pooling layers for dimensionality reduction
Include dropout layer to prevent overfitting
Design fully connected layers for classification
Use appropriate activation functions (ReLU and Sigmoid)

### Step 6: Model Compilation
Choose Adam optimizer with appropriate learning rate
Select binary crossentropy as loss function
Set accuracy as the primary evaluation metric
Compile the model with chosen parameters

### Step 7: Model Training
Train the model using the training data generator
Validate performance using the validation data generator
Run training for specified number of epochs (20 in our case)
Monitor training progress and metrics

### Step 8: Model Evaluation
Evaluate final model performance on validation set
Plot training history (accuracy and loss curves)
Analyze model performance metrics
Identify any overfitting or underfitting issues

### Step 9: Model Saving
Save the trained model in HDF5 format
Also save in Keras native format for compatibility
Verify model files are properly saved

### Step 10: Model Testing
Load test images for inference
Preprocess test images to match training format
Run predictions on new images
Interpret model predictions (healthy vs unhealthy)
Test with various sample images to verify performance

## For Prediction:
Load the saved model using Keras
Preprocess your input image (resize to 128x128, normalize)
Run model prediction
Interpret output: values < 0.5 = healthy, ≥ 0.5 = unhealthy
