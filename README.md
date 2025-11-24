# CNN_Bee_Health_Detection
Convolutional Neural Network (CNN) model to classify honey bee images as either "healthy" or "unhealthy" based on visual characteristics. The model was trained on the Honey Bee Annotated Images dataset from Kaggle, containing 5,172 labeled images.

## Step-by-Step Implementation Guide
### Step 1: Environment Setup
Open Google Colab in your browser<br>
Create a new notebook<br>
Ensure GPU acceleration is enabled in notebook settings<br>
Install required packages using pip<br>

### Step 2: Data Acquisition
Access the Kaggle dataset through the kagglehub library<br>
Download the "Honey Bee Annotated Images" dataset<br>
Verify dataset download and explore the file structure<br>
Check the CSV file containing image labels and health status<br>

### Step 3: Data Preparation
Create organized directory structure for training and validation data<br>
Split the dataset into training (80%) and validation (20%) sets<br>
Copy images to respective directories based on their health labels<br>
Verify image counts in each directory<br>

### Step 4: Data Preprocessing
Set up image data generators with augmentation techniques<br>
Configure image resizing to 128x128 pixels<br>
Apply data augmentation (rotation, shifting, zooming, flipping)<br>
Normalize pixel values to 0-1 range<br>
Create data generators for training and validation<br>

### Step 5: Model Architecture Design
Design a sequential CNN model with multiple convolutional layers<br>
Add pooling layers for dimensionality reduction<br>
Include dropout layer to prevent overfitting<br>
Design fully connected layers for classification<br>
Use appropriate activation functions (ReLU and Sigmoid)<br>

### Step 6: Model Compilation
Choose Adam optimizer with appropriate learning rate<br>
Select binary crossentropy as loss function<br>
Set accuracy as the primary evaluation metric<br>
Compile the model with chosen parameters<br>

### Step 7: Model Training
Train the model using the training data generator<br>
Validate performance using the validation data generator<br>
Run training for specified number of epochs (20 in our case)<br>
Monitor training progress and metrics<br>

### Step 8: Model Evaluation
Evaluate final model performance on validation set<br>
Plot training history (accuracy and loss curves)<br>
Analyze model performance metrics<br>
Identify any overfitting or underfitting issues<br>

### Step 9: Model Saving
Save the trained model in HDF5 format<br>
Also save in Keras native format for compatibility<br>
Verify model files are properly saved<br>

### Step 10: Model Testing
Load test images for inference<br>
Preprocess test images to match training format<br>
Run predictions on new images<br>
Interpret model predictions (healthy vs unhealthy)<br>
Test with various sample images to verify performance<br>

## For Prediction:
Load the saved model using Keras<br>
Preprocess your input image (resize to 128x128, normalize)<br>
Run model prediction<br>
Interpret output: values < 0.5 = healthy, ≥ 0.5 = unhealthy<br>
