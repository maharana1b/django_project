from ast import Return
from email import message
from django.shortcuts import render
import json
import string
import random
import nltk
import numpy as np
import pandas as pd
from nltk.stem import WordNetLemmatizer
import tensorflow as tf
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Dense, Dropout
from nltk import word_tokenize
# nltk.download("punkt")
# nltk.download("wordnet")
# nltk.download('omw-1.4')
from googletrans import Translator
from englisttohindi.englisttohindi import EngtoHindi
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework.authentication import BasicAuthentication, SessionAuthentication,TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
# Create your views here.
data = {"intents": [
             {"tag": "greeting",
              "patterns": ["Hello", "How are you?", "Hi there", "Hi", "Whats up"],
              "responses": ["Howdy Partner!", "Hello", "How are you doing?", "Greetings!", "How do you do?"],
             },
             {"tag": "age",
              "patterns": ["how old are you?", "when is your birthday?", "when was you born?"],
              "responses": ["Somebody Downloaded me just now.", "I was Downloaded", "I did't got birth I was downloaded."]
             },
             {"tag": "date",
              "patterns": ["what are you doing this weekend?",
"do you want to hang out some time?", "what are your plans for this week"],
              "responses": ["I am available all week", "I don't have any plans", "I am not busy"]
             },
             {"tag": "name",
              "patterns": ["what is your name?", "what are you called?", "who are you?"],
              "responses": ["My name is Cuddler", "I'm Cuddler", "Cuddler"]
             },
             {"tag": "goodbye",
              "patterns": [ "bye", "g2g", "see ya", "adios", "c ya"],
              "responses": ["It was nice speaking to you", "See you later", "Speak soon!"]
             },
            {"tag":"color",
             "patterns": ["What is your Color?","Which Color you are?"],
             "responses": ["I am invisible just like air"]
             },
            {"tag":"GOD",
             "patterns":["Who is GOD?","Do you know GOD?"],
             "responses":["I am the GOD"]                
            },
            {"tag":"from",
             "patterns":["where are you from?","which place do you belong?","What is your Address?"],
             "responses":["I am from the world of excellence."]
            }
]}

lemmatizer = WordNetLemmatizer()

words = []
classes = []
doc_x = []
doc_y = []

for intent in data["intents"]:
    for pattern in intent["patterns"]:
        tokens = word_tokenize(pattern)
        words.extend(tokens)
        doc_x.append(pattern)
        doc_y.append(intent["tag"])
    if intent["tag"] not in classes:
        classes.append(intent["tag"])

words = [lemmatizer.lemmatize(word.lower()) for word in words if word not in string.punctuation]
words = sorted(set(words))
classes = sorted(set(classes))

training = []
out_empty = [0] * len(classes)

for idx,doc in enumerate(doc_x):
    bow = []
    text = lemmatizer.lemmatize(doc.lower())
    for word in words:
        bow.append(1) if word in text else bow.append(0)
    output_row = list(out_empty)
    output_row[classes.index(doc_y[idx])] = 1
    training.append([bow, output_row])

random.shuffle(training)
training = np.array(training, dtype=object)
train_x = np.array(list(training[:,0]))
train_y = np.array(list(training[:,1]))

input_shape = (len(train_x[0]),)
output_shape = len(train_y[0])
epochs = 200

model = Sequential()
model.add(Dense(128, input_shape = input_shape, activation="relu"))
model.add(Dropout(0.5))
model.add(Dense(64, activation="relu"))
model.add(Dropout(0.3))
model.add(Dense(output_shape, activation = "softmax"))

adam = tf.keras.optimizers.Adam(learning_rate=0.01, decay=1e-6)
model.compile(loss='categorical_crossentropy',optimizer=adam,metrics=["accuracy"])
model.fit(x=train_x,y=train_y,epochs=200,verbose=1)

def clean_text(text):
    tokens = nltk.word_tokenize(text)
    tokens = [lemmatizer.lemmatize(word) for word in tokens]
    return tokens

def bag_of_words(text, vocab):
    tokens = clean_text(text)
    bow = [0] * len(vocab)
    for w in tokens:
        for idx, word in enumerate(vocab):
            if word == w:
                bow[idx] = 1
    return np.array(bow)

def pred_class(text, vocab, labels):
    bow = bag_of_words(text, vocab)
    result = model.predict(np.array([bow]))[0]
    thresh = 0.2
    y_pred = [[idx,res] for idx, res in enumerate(result) if res > thresh]
    y_pred.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in y_pred:
        return_list.append(labels[r[0]])
    return return_list

def get_response(intents_list, intents_json):
    tag = intents_list[0]
    list_of_intents = intents_json["intents"]
    for i in list_of_intents:
        if i["tag"] == tag:
            result = random.choice(i["responses"])
            break
    return result

translator = Translator()


# class CsrfExemptSessionAuthentication(SessionAuthentication):
#     def enforce_csrf(self, request):
#         return
@method_decorator(csrf_exempt,name='dispatch')
class ChatHindi(APIView):
    authentication_classes = [SessionAuthentication,BasicAuthentication,TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self,request):
        input = None
        return Response({'input':input})
    
    def post(self,request):
        input = request.data.get('input')
        input = str(input)
        if input != 'hi':
            message_eng = translator.translate(str(input)).text
            intents = pred_class(message_eng, words, classes)
            result = get_response(intents, data)
            result_hindi = translator.translate(result,src='en',dest='hi')
            result = result_hindi.text
        
            return Response({"Bot":result})

        elif input == 'hi':
            return Response({"Bot":"मेरा नाम कडलर है, मैं आपकी कैसे मदद कर सकता हूं।"})
            
        else :
            result = "Nice to talk to you."        
            return Response({"Bot":result})


@method_decorator(csrf_exempt,name='dispatch')
class ChatEnglish(APIView):
    authentication_classes = [SessionAuthentication,BasicAuthentication,TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self,request):
        input = None
        return Response({'input':input})
    
    def post(self,request):
        input = request.data.get('input')
        input = str(input)
        if input != 'hi':
            message_eng = input
            intents = pred_class(message_eng, words, classes)
            result = get_response(intents, data)
            # result_hindi = EngtoHindi(str(result))
            # result = result_hindi.convert
        
            return Response({"Bot":result})

        elif input == 'hi':
            return Response({"Bot":"Hello I am Cuddler, how may I help you."})
            
        else :
            result = "Nice to talk to you."        
            return Response({"Bot":result})



@method_decorator(csrf_exempt,name='dispatch')
class ChatBengali(APIView):
    authentication_classes = [SessionAuthentication,BasicAuthentication,TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self,request):
        input = None
        return Response({'input':input})
    
    def post(self,request):
        input = request.data.get('input')
        input = str(input)
        if input != 'hi':
            message_eng = translator.translate(str(input)).text
            intents = pred_class(message_eng, words, classes)
            result = get_response(intents, data)
            result_bangali = translator.translate(result,src='en',dest='bn')
            result = result_bangali.text
        
            return Response({"Bot":result})

        elif input == 'hi':
            return Response({"Bot":"আমার নাম কুডলার, আমি কিভাবে আপনাকে সাহায্য করতে পারি!"})
            
        else :
            result = "Nice to talk to you."        
            return Response({"Bot":result})

@method_decorator(csrf_exempt,name='dispatch')
class ChatTamil(APIView):
    authentication_classes = [SessionAuthentication,BasicAuthentication,TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self,request):
        input = None
        return Response({'input':input})
    
    def post(self,request):
        input = request.data.get('input')
        input = str(input)
        if input != 'hi':
            message_eng = translator.translate(str(input)).text
            intents = pred_class(message_eng, words, classes)
            result = get_response(intents, data)
            result_tamil = translator.translate(result,src='en',dest='ta')
            result = result_tamil.text
        
            return Response({"Bot":result})

        elif input == 'hi':
            return Response({"Bot":"என் பெயர் கட்லர், நான் உங்களுக்கு எப்படி உதவுவது!"})
            
        else :
            result = "Nice to talk to you."        
            return Response({"Bot":result})


@method_decorator(csrf_exempt,name='dispatch')
class ChatTelugu(APIView):
    authentication_classes = [SessionAuthentication,BasicAuthentication,TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self,request):
        input = None
        return Response({'input':input})
    
    def post(self,request):
        input = request.data.get('input')
        input = str(input)
        if input != 'hi':
            message_eng = translator.translate(str(input)).text
            intents = pred_class(message_eng, words, classes)
            result = get_response(intents, data)
            result_telugu = translator.translate(result,src='en',dest='te')
            result = result_telugu.text
        
            return Response({"Bot":result})

        elif input == 'hi':
            return Response({"Bot":"నా పేరు కడ్లర్, నేను మీకు ఎలా సహాయం చేయగలను!"})
            
        else :
            result = "Nice to talk to you."        
            return Response({"Bot":result})


@method_decorator(csrf_exempt,name='dispatch')
class ChatMalayalam(APIView):
    authentication_classes = [SessionAuthentication,BasicAuthentication,TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self,request):
        input = None
        return Response({'input':input})
    
    def post(self,request):
        input = request.data.get('input')
        input = str(input)
        if input != 'hi':
            message_eng = translator.translate(str(input)).text
            intents = pred_class(message_eng, words, classes)
            result = get_response(intents, data)
            result_malayalam = translator.translate(result,src='en',dest='ml')
            result = result_malayalam.text
        
            return Response({"Bot":result})

        elif input == 'hi':
            return Response({"Bot":"എന്റെ പേര് കഡ്ലർ, എനിക്ക് നിങ്ങളെ എങ്ങനെ സഹായിക്കാനാകും!"})
            
        else :
            result = "Nice to talk to you."        
            return Response({"Bot":result})


@method_decorator(csrf_exempt,name='dispatch')
class ChatKannada(APIView):
    authentication_classes = [SessionAuthentication,BasicAuthentication,TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self,request):
        input = None
        return Response({'input':input})
    
    def post(self,request):
        input = request.data.get('input')
        input = str(input)
        if input != 'hi':
            message_eng = translator.translate(str(input)).text
            intents = pred_class(message_eng, words, classes)
            result = get_response(intents, data)
            result_kannada = translator.translate(result,src='en',dest='kn')
            result = result_kannada.text
        
            return Response({"Bot":result})

        elif input == 'hi':
            return Response({"Bot":"ನನ್ನ ಹೆಸರು ಕಡ್ಲರ್, ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?"})
            
        else :
            result = "Nice to talk to you."        
            return Response({"Bot":result})


@method_decorator(csrf_exempt,name='dispatch')
class ChatMarathi(APIView):
    authentication_classes = [SessionAuthentication,BasicAuthentication,TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self,request):
        input = None
        return Response({'input':input})
    
    def post(self,request):
        input = request.data.get('input')
        input = str(input)
        if input != 'hi':
            message_eng = translator.translate(str(input)).text
            intents = pred_class(message_eng, words, classes)
            result = get_response(intents, data)
            result_marathi = translator.translate(result,src='en',dest='mr')
            result = result_marathi.text
        
            return Response({"Bot":result})

        elif input == 'hi':
            return Response({"Bot":"माझे नाव कुडलर आहे, मी तुला कशी मदत करू!"})
            
        else :
            result = "Nice to talk to you."        
            return Response({"Bot":result})


@method_decorator(csrf_exempt,name='dispatch')
class ChatOdia(APIView):
    authentication_classes = [SessionAuthentication,BasicAuthentication,TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self,request):
        input = None
        return Response({'input':input})
    
    def post(self,request):
        input = request.data.get('input')
        input = str(input)
        if input != 'hi':
            message_eng = translator.translate(str(input)).text
            intents = pred_class(message_eng, words, classes)
            result = get_response(intents, data)
            result_odia = translator.translate(result,src='en',dest='or')
            result = result_odia.text
        
            return Response({"Bot":result})

        elif input == 'hi':
            return Response({"Bot":"ମୋର ନାମ କୁଡଲର, ମୁଁ ତୁମକୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?"})
            
        else :
            result = "Nice to talk to you."        
            return Response({"Bot":result})


@method_decorator(csrf_exempt,name='dispatch')
class ChatGujurati(APIView):
    authentication_classes = [SessionAuthentication,BasicAuthentication,TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self,request):
        input = None
        return Response({'input':input})
    
    def post(self,request):
        input = request.data.get('input')
        input = str(input)
        if input != 'hi':
            message_eng = translator.translate(str(input)).text
            intents = pred_class(message_eng, words, classes)
            result = get_response(intents, data)
            result_gujurati = translator.translate(result,src='en',dest='gu')
            result = result_gujurati.text
        
            return Response({"Bot":result})

        elif input == 'hi':
            return Response({"Bot":"હાય મારું નામ કડલર છે હું તમને કેવી રીતે મદદ કરી શકું."})
            
        else :
            result = "Nice to talk to you."        
            return Response({"Bot":result})

languages = ['Hindi','English','Marathi','Kannada','Bangali','Odia','Telugu','Tamil','Gujurati','Malayalam']
l_data = pd.DataFrame(languages)

@login_required(login_url='/')
def chatbot(request):
    user_input = None
    result = None
    language = None
    # listlanguage = ['Hindi','English','Marathi','Kannada','Bangali','Odia','Telugu','Tamil','Gujurati','Malayalam']
    listlanguage = sorted(l_data[0])
    if request.method == 'POST':
        language = request.POST.get('language')
        user_input = request.POST.get('input')
        user_input = str(user_input)
        if language == 'English':
            if user_input != 'hi':
                message_eng = user_input
                intents = pred_class(message_eng, words, classes)
                result = get_response(intents, data)
                            
            elif user_input == 'hi':
                result == "Hello I am Cuddler, how may I help you."
        if language == 'Hindi':
            if user_input != 'hi':
                message_eng = translator.translate(str(user_input)).text
                intents = pred_class(message_eng, words, classes)
                result = get_response(intents, data)
                result_hindi = translator.translate(result,src='en',dest='hi')
                result = result_hindi.text
        if language == 'Bangali':
            if user_input != 'hi':
                message_eng = translator.translate(str(user_input)).text
                intents = pred_class(message_eng, words, classes)
                result = get_response(intents, data)
                result_bangali = translator.translate(result,src='en',dest='bn')
                result = result_bangali.text
        if language == 'Tamil':
            if user_input != 'hi':
                message_eng = translator.translate(str(user_input)).text
                intents = pred_class(message_eng, words, classes)
                result = get_response(intents, data)
                result_tamil = translator.translate(result,src='en',dest='ta')
                result = result_tamil.text
        if language == 'Telugu':
            if user_input != 'hi':
                message_eng = translator.translate(str(user_input)).text
                intents = pred_class(message_eng, words, classes)
                result = get_response(intents, data)
                result_telugu = translator.translate(result,src='en',dest='te')
                result = result_telugu.text
        if language == 'Malayalam':
            if user_input != 'hi':
                message_eng = translator.translate(str(user_input)).text
                intents = pred_class(message_eng, words, classes)
                result = get_response(intents, data)
                result_malayalam = translator.translate(result,src='en',dest='ml')
                result = result_malayalam.text
        if language == 'Kannada':
            if user_input != 'hi':
                message_eng = translator.translate(str(user_input)).text
                intents = pred_class(message_eng, words, classes)
                result = get_response(intents, data)
                result_kannada = translator.translate(result,src='en',dest='kn')
                result = result_kannada.text
        if language == 'Marathi':
            if user_input != 'hi':
                message_eng = translator.translate(str(user_input)).text
                intents = pred_class(message_eng, words, classes)
                result = get_response(intents, data)
                result_kannada = translator.translate(result,src='en',dest='kn')
                result = result_kannada.text
        if language == 'Odia':
            if user_input != 'hi':
                message_eng = translator.translate(str(user_input)).text
                intents = pred_class(message_eng, words, classes)
                result = get_response(intents, data)
                result_odia = translator.translate(result,src='en',dest='or')
                result = result_odia.text
        if language == 'Gujurati':
            if user_input != 'hi':
                message_eng = translator.translate(str(user_input)).text
                intents = pred_class(message_eng, words, classes)
                result = get_response(intents, data)
                result_gujurati = translator.translate(result,src='en',dest='gu')
                result = result_gujurati.text
            



    context = {'input':user_input,'message':result,'language':listlanguage,'selected_language':language}

    return render(request=request,template_name='chatbot.html',context=context)