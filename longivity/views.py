from os import rename
from django.shortcuts import render
import pickle
import pandas as pd
from rest_framework.decorators import APIView
from rest_framework.response import Response
from collections.abc import Iterable
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from sklearn.neighbors import KNeighborsRegressor
from sklearn.compose import ColumnTransformer
from rest_framework.authentication import BasicAuthentication,SessionAuthentication,TokenAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
import lightgbm as ltg

# Create your views here.
# sam = pickle.load(open('sam_data_new.pkl','rb'))
# mam = pickle.load(open('mam_data_new.pkl','rb'))

sam = pickle.load(open('/home/ml/ml_cuddles/sam_data_new.pkl','rb'))
mam = pickle.load(open('/home/ml/ml_cuddles/mam_data_new.pkl','rb'))

data = pd.DataFrame(sam)
data_mam = pd.DataFrame(mam)

x = data[['age_in_months','diagnosis_stage','cancer_type','treatment_phase','height','weight','bmi']]
z = data[['age_in_months','diagnosis_stage','cancer_type','treatment_phase','height','muac','bmi']]
y = data['age_in_months_well']

x1 = data_mam[['age_in_months','diagnosis_stage','cancer_type','treatment_phase','height','weight','bmi']]
z1 = data_mam[['age_in_months','diagnosis_stage','cancer_type','treatment_phase','height','muac','bmi']]
y1 = data_mam['age_in_months_well']

# class CsrfExemptSessionAuthentication(SessionAuthentication):
#     def enforce_csrf(self, request):
#         return


@method_decorator(csrf_exempt, name='dispatch')
class SamApi(APIView):
    authentication_classes = [SessionAuthentication,BasicAuthentication,TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self,request):
        age_in_months = None
        diagnosis_stage = None
        cancer_type = None
        treatment_phase = None
        height = None
        weight = None
        bmi = None
        return Response({'age_in_months':age_in_months,'diagnosis_stage':diagnosis_stage,'cancer_type':cancer_type,
        'treatment_phase':treatment_phase,'height':height,'weight':weight,'bmi':bmi})
    
    def post(self,request):
        age_in_months = request.data.get('age_in_months')
        diagnosis_stage = request.data.get('diagnosis_stage')
        cancer_type = request.data.get('cancer_type')
        treatment_phase = request.data.get('treatment_phase')
        height = request.data.get('height')
        weight = request.data.get('weight')
        bmi = request.data.get('bmi')
        # muac = request.data.get('muac')
        step1 = ColumnTransformer(transformers=[('col_tnf',OneHotEncoder(sparse=False,drop='first',handle_unknown='ignore'),[1,2,3])],
        remainder='passthrough')

        # step2 = KNeighborsRegressor(n_neighbors=9)
        step2 = ltg.LGBMRegressor(boosting_type='gbdt', class_weight=None, colsample_bytree=1.0,
              importance_type='split', learning_rate=0.1, max_depth=-1,
              min_child_samples=20, min_child_weight=0.001, min_split_gain=0.0,
              n_estimators=100, n_jobs=-1, num_leaves=31, objective=None,
              random_state=1669, reg_alpha=0.0, reg_lambda=0.0, silent='warn',
              subsample=1.0, subsample_for_bin=200000, subsample_freq=0)

        pipe = Pipeline([
            ('step1',step1),
            ('step2',step2)
        ])
       
        
        pipe.fit(x,y)
        y_pred = pipe.predict(x)
        result = pipe.predict([[age_in_months,diagnosis_stage,cancer_type,treatment_phase,height,weight,bmi]])
        # else:
        #     pipe.fit(z,y)
        #     y_pred = pipe.predict(z)
        #     result = pipe.predict([[age_in_months,diagnosis_stage,cancer_type,treatment_phase,height,muac,bmi]])
        
        predicted_age = int(result[0])
        print(type(predicted_age))
        stay_time = predicted_age - int(age_in_months)
        stay_time = int(stay_time)
        
        if stay_time >= 2:
            return Response({'The minimun treatment duration for patient in months':stay_time})
            
        else:
            return Response({'The minimun treatment duration for patient in months':2})


@method_decorator(csrf_exempt,name='dispatch')
class MamApi(APIView):
    authentication_classes = [SessionAuthentication,BasicAuthentication,TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self,request):
        age_in_months = None
        diagnosis_stage = None
        cancer_type = None
        treatment_phase = None
        height = None
        weight = None
        bmi = None
        return Response({'age_in_months':age_in_months,'diagnosis_stage':diagnosis_stage,'cancer_type':cancer_type,
        'treatment_phase':treatment_phase,'height':height,'weight':weight,'bmi':bmi})
    
    def post(self,request):
        age_in_months = request.data.get('age_in_months')
        diagnosis_stage = request.data.get('diagnosis_stage')
        cancer_type = request.data.get('cancer_type')
        treatment_phase = request.data.get('treatment_phase')
        height = request.data.get('height')
        weight = request.data.get('weight')
        bmi = request.data.get('bmi')
        # muac = request.data.get('muac')
        
        step1 = ColumnTransformer(transformers=[('col_tnf',OneHotEncoder(sparse=False,drop='first',handle_unknown='ignore'),[1,2,3])],
        remainder='passthrough')

        # step2 = KNeighborsRegressor(n_neighbors=9)
        step2 = ltg.LGBMRegressor(boosting_type='gbdt', class_weight=None, colsample_bytree=1.0,
              importance_type='split', learning_rate=0.1, max_depth=-1,
              min_child_samples=20, min_child_weight=0.001, min_split_gain=0.0,
              n_estimators=100, n_jobs=-1, num_leaves=31, objective=None,
              random_state=5930, reg_alpha=0.0, reg_lambda=0.0, silent='warn',
              subsample=1.0, subsample_for_bin=200000, subsample_freq=0)

        pipe = Pipeline([
            ('step1',step1),
            ('step2',step2)
        ])
       
        # if age_in_months >= 55:
        pipe.fit(x1,y1)
        y_pred = pipe.predict(x1)
        result = pipe.predict([[age_in_months,diagnosis_stage,cancer_type,treatment_phase,height,weight,bmi]])
        # else:
        #     pipe.fit(z1,y1)
        #     y_pred = pipe.predict(z1)
        #     result = pipe.predict([[diagnosis_stage,cancer_type,treatment_phase,height,muac,bmi]])
        
        predicted_age = int(result[0])
        print(type(predicted_age))
        stay_time = predicted_age - int(age_in_months)
        stay_time = int(stay_time)
        
        if stay_time >= 2:
            return Response({'The minimun treatment duration for patient in months':stay_time})
            
        else:
            return Response({'The minimun treatment duration for patient in months':2})


@login_required(login_url='/')
def sam(request):
    current_age_in_month = None
    diagnosis = None
    cancer = None
    treatment = None
    height = None
    weight = None
    bmi = None
    # muac = None
    result = None
    list_diagnosis = sorted(set(data['diagnosis_stage'].values))
    list_cancer = sorted(set(data['cancer_type'].values))
    list_treatment = sorted(set(data['treatment_phase'].values))
    if request.method == 'POST':
        current_age_in_month = request.POST.get('current_age')
        diagnosis = request.POST.get('diagnosis')
        cancer = request.POST.get('cancer')
        treatment = request.POST.get('treatment')
        height = request.POST.get('height')
        weight = request.POST.get('weight')
        bmi = request.POST.get('bmi')
        # muac = request.POST.get('muac')

        step1 = ColumnTransformer(transformers=[('col_tnf',OneHotEncoder(sparse=False,drop='first',handle_unknown='ignore'),[1,2,3])],
        remainder='passthrough')

        # step2 = KNeighborsRegressor(n_neighbors=9)
        step2 = ltg.LGBMRegressor(boosting_type='gbdt', class_weight=None, colsample_bytree=1.0,
              importance_type='split', learning_rate=0.1, max_depth=-1,
              min_child_samples=20, min_child_weight=0.001, min_split_gain=0.0,
              n_estimators=100, n_jobs=-1, num_leaves=31, objective=None,
              random_state=1669, reg_alpha=0.0, reg_lambda=0.0, silent='warn',
              subsample=1.0, subsample_for_bin=200000, subsample_freq=0)

        pipe = Pipeline([
            ('step1',step1),
            ('step2',step2)
        ])
       
        # if int(current_age_in_month) >= 55:
        pipe.fit(x,y)
        y_pred = pipe.predict(x)
        result = pipe.predict([[current_age_in_month,diagnosis,cancer,treatment,height,weight,bmi]])
        # else:
        #     pipe.fit(z,y)
        #     y_pred = pipe.predict(z)
        #     result = pipe.predict([[current_age_in_month,diagnosis,cancer,treatment,height,muac,bmi]])
        
        predicted_age = int(result[0])
        print(type(predicted_age))
        stay_time = int(predicted_age) - int(current_age_in_month)
        
        if stay_time < 1:
            result = 2
        else:
            result = stay_time
           
        # result = stay_time
        # print(result)

    context = {'list_diagnosis':list_diagnosis,'list_cancer':list_cancer,'list_treatment':list_treatment,'result':result,
    'current_age':current_age_in_month,'diagnosis':diagnosis,'cancer':cancer,'treatment':treatment,'height':height,
    'weight':weight,'bmi':bmi}

    return render(request=request,template_name='sam.html',context=context)





@login_required(login_url='/')
def mam(request):
    current_age_in_month = None
    diagnosis = None
    cancer = None
    treatment = None
    height = None
    weight = None
    bmi = None
    muac = None
    result = None
    list_diagnosis = sorted(set(data_mam['diagnosis_stage'].values))
    list_cancer = sorted(set(data_mam['cancer_type'].values))
    list_treatment = sorted(set(data_mam['treatment_phase'].values))
    if request.method == 'POST':
        current_age_in_month = request.POST.get('current_age')
        diagnosis = request.POST.get('diagnosis')
        cancer = request.POST.get('cancer')
        treatment = request.POST.get('treatment')
        height = request.POST.get('height')
        weight = request.POST.get('weight')
        bmi = request.POST.get('bmi')
        muac = request.POST.get('muac')

        step1 = ColumnTransformer(transformers=[('col_tnf',OneHotEncoder(sparse=False,drop='first',handle_unknown='ignore'),[1,2,3])],
        remainder='passthrough')

        # step2 = KNeighborsRegressor(n_neighbors=9)
        step2 = ltg.LGBMRegressor(boosting_type='gbdt', class_weight=None, colsample_bytree=1.0,
              importance_type='split', learning_rate=0.1, max_depth=-1,
              min_child_samples=20, min_child_weight=0.001, min_split_gain=0.0,
              n_estimators=100, n_jobs=-1, num_leaves=31, objective=None,
              random_state=5930, reg_alpha=0.0, reg_lambda=0.0, silent='warn',
              subsample=1.0, subsample_for_bin=200000, subsample_freq=0)

        pipe = Pipeline([
            ('step1',step1),
            ('step2',step2)
        ])
       
        # if int(current_age_in_month) >= 55:
        pipe.fit(x1,y1)
        y_pred = pipe.predict(x1)
        result = pipe.predict([[current_age_in_month,diagnosis,cancer,treatment,height,weight,bmi]])
        # else:
        #     pipe.fit(z1,y1)
        #     y_pred = pipe.predict(z1)
        #     result = pipe.predict([[diagnosis,cancer,treatment,height,muac,bmi]])
        
        predicted_age = int(result[0])
        print(type(predicted_age))
        stay_time = int(predicted_age) - int(current_age_in_month)
        if stay_time < 1:
            result = 2
        else:
            result = stay_time    
        # print(result)

    context = {'list_diagnosis':list_diagnosis,'list_cancer':list_cancer,'list_treatment':list_treatment,'result':result,
    'current_age':current_age_in_month,'diagnosis':diagnosis,'cancer':cancer,'treatment':treatment,'height':height,
    'weight':weight,'bmi':bmi,'muac':muac}

    return render(request=request,template_name='mam.html',context=context)
    # return render(request=request,template_name='mam.html')