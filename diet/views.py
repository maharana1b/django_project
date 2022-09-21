from asyncio import base_futures
from django.shortcuts import render
import pickle
import pandas as pd
from iteration_utilities import unique_everseen
from iteration_utilities import duplicates
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from rest_framework.decorators import APIView
from rest_framework.response import Response
from collections.abc import Iterable
from django.shortcuts import render,redirect
from django.contrib.auth import login, authenticate,logout
from django.contrib import messages
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from rest_framework.authentication import BasicAuthentication,SessionAuthentication,TokenAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny,IsAdminUser
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator


# class CsrfExemptSessionAuthentication(SessionAuthentication):
#     def enforce_csrf(self, request):
#         return


# # # Create your views here.
# data = pickle.load(open('diet_plan6.pkl', 'rb'))
# food_data = pickle.load(open('food_list.pkl','rb'))
# f1 = pickle.load(open('breakfast.pkl','rb'))
# f2 = pickle.load(open('lunch.pkl','rb'))
# f3 = pickle.load(open('supper.pkl','rb'))
# f4 = pickle.load(open('dinner.pkl','rb'))
food_data = pickle.load(open('/home/ml/ml_cuddles/food_list.pkl','rb'))
data = pickle.load(open('/home/ml/ml_cuddles/diet_plan6.pkl', 'rb'))
f1 = pickle.load(open('/home/ml/ml_cuddles/breakfast.pkl','rb'))
f2 = pickle.load(open('/home/ml/ml_cuddles/lunch.pkl','rb'))
f3 = pickle.load(open('/home/ml/ml_cuddles/supper.pkl','rb'))
f4 = pickle.load(open('/home/ml/ml_cuddles/dinner.pkl','rb'))
food = pd.DataFrame(food_data)
data_new1 = pd.DataFrame(data)
breakfast = pd.DataFrame(f1)
lunch = pd.DataFrame(f2)
supper = pd.DataFrame(f3)
dinner = pd.DataFrame(f4)
cv = CountVectorizer(max_features=150, stop_words='english')
vectors = cv.fit_transform(data_new1['tags']).toarray()
similarity = cosine_similarity(vectors)


data_new1['age'] = pd.to_numeric(data_new1['age'])



#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
def recommend_age_id(food):
    food_index = data_new1[data_new1['age'] == food].index[0]
    distances = similarity[food_index]
    food_list = sorted(list(enumerate(distances)),reverse=True,key=lambda x:x[1])[1:20]
    food_list = set(food_list)
    diet_plan = []
    for i in food_list:
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_0)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_1)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_2)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_3)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_4)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_5)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_6)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_7)

    return set(diet_plan)

def recommend_gom_id(food):
    food_index = data_new1[data_new1['final_gom_label'] == food].index[0]
    distances = similarity[food_index]
    food_list = sorted(list(enumerate(distances)),reverse=True,key=lambda x:x[1])[1:5]
    food_list = set(food_list)
    diet_plan = []
    for i in food_list:
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_0)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_1)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_2)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_3)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_4)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_5)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_6)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_7)

    return set(diet_plan)             

def recommend_diagnosis_id(food):
    food_index = data_new1[data_new1['diagnosis_stage'] == food].index[0]
    distances = similarity[food_index]
    food_list = sorted(list(enumerate(distances)),reverse=True,key=lambda x:x[1])[1:5]
    food_list = set(food_list)
    diet_plan = []
    for i in food_list:
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_0)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_1)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_2)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_3)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_4)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_5)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_6)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_7)
                

    return set(diet_plan)

def recommend_treatment_id(food):
    food_index = data_new1[data_new1['treatment_phase'] == food].index[0]
    distances = similarity[food_index]
    food_list = sorted(list(enumerate(distances)),reverse=True,key=lambda x:x[1])[1:5]
    food_list = set(food_list)
    diet_plan = []
    for i in food_list:
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_0)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_1)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_2)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_3)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_4)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_5)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_6)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_7)            

    return set(diet_plan)

def recommend_cancer_id(food):
    food_index = data_new1[data_new1['cancer_type'] == food].index[0]
    distances = similarity[food_index]
    food_list = sorted(list(enumerate(distances)),reverse=True,key=lambda x:x[1])[1:5]
    food_list = set(food_list)
    diet_plan = []
    for i in food_list:
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_0)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_1)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_2)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_3)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_4)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_5)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_6)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_7)
 
    return set(diet_plan)

def recommend_infection_id(food):
    food_index = data_new1[data_new1['infection'] == food].index[0]
    distances = similarity[food_index]
    food_list = sorted(list(enumerate(distances)),reverse=True,key=lambda x:x[1])[1:5]
    food_list = set(food_list)
    diet_plan = []
    for i in food_list:
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_0)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_1)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_2)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_3)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_4)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_5)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_6)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_7)
    
    return set(diet_plan)

def recommend_medical_id(food):
    food_index = data_new1[data_new1['medical_side_effect'] == food].index[0]
    distances = similarity[food_index]
    food_list = sorted(list(enumerate(distances)),reverse=True,key=lambda x:x[1])[1:5]
    food_list = set(food_list)
    diet_plan = []
    for i in food_list:
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_0)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_1)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_2)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_3)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_4)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_5)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_6)
        diet_plan.append(data_new1.iloc[i[0]].diet_plan_id_7)

    return set(diet_plan)

def get_time(item):
    food_index = food[food['FOOD NAME'] == item].index[0]
    time_slot = food['TIME SLOT'][food_index]
    return time_slot

def get_time_id(item):
    food_index = food[food['ID'] == item].index[0]
    time_slot = food['TIME SLOT'][food_index]
    return time_slot
        
def break_name(item):
    try:
        food_index = breakfast[breakfast['ID'] == item].index[0]
        item_name = breakfast['FOOD NAME'][food_index]
    except:
        item_name = ' '
    return item_name

def lunch_name(item):
    try:
        food_index = lunch[lunch['ID'] == item].index[0]
        item_name = lunch['FOOD NAME'][food_index]
    except:
        item_name = ' '
    return item_name

def supper_name(item):
    try:
        food_index = supper[supper['ID'] == item].index[0]
        item_name = supper['FOOD NAME'][food_index]
    except:
        item_name = ' '
    return item_name

def dinner_name(item):
    try:
        food_index = dinner[dinner['ID'] == item].index[0]
        item_name = dinner['FOOD NAME'][food_index]
    except:
        item_name = ' '
    return item_name



@login_required(login_url='/')
def diet(request):
    a = []
    b = []
    c = []
    d = []
    e = []
    f = []
    result = []
    time = []
    age = None
    gom = None
    diagnosis = None
    treatment = None
    cancer = None
    infection = None
    side_effect = None
    food = None
    zone = None
    
    p_age = sorted(set(data_new1['age'].values))
    p_gom = sorted(set(data_new1['final_gom_label'].values))
    p_diagnosis = sorted(set(data_new1['diagnosis_stage'].values))
    p_treatment = sorted(set(data_new1['treatment_phase'].values))
    p_cancer = sorted(set(data_new1['cancer_type'].values))
    p_infection = sorted(set(data_new1['infection'].values))
    p_medical = sorted(set(data_new1['medical_side_effect'].values))
    p_food = sorted(set(data_new1['food_preference'].values))
    p_zone = sorted(set(data_new1['zone'].values))
    food_lunch = list(lunch['ID'])
    food_supper = list(supper['ID'].values)
    food_dinner = list(dinner['ID'].values)
    if request.method == 'POST':
        age = request.POST.get('age')
        gom = request.POST.get('gom')
        diagnosis = request.POST.get('diagnosis')
        treatment = request.POST.get('treatment')
        cancer = request.POST.get('cancer')
        infection = request.POST.get('infection')
        side_effect = request.POST.get('side_effect')
        food = request.POST.get('food_type')
        zone = request.POST.get('zone')
        x = []
        y = []
        z = []
        bf = []
        LUNCH = []
        SUPPER = []
        DINNER = []
        x.extend(recommend_age_id(int(age)))
        # x.extend(recommend_food(food))
        # a = unique_everseen(duplicates(x))
        a = set(x)

        y.extend(recommend_gom_id(gom))
        y.extend(recommend_diagnosis_id(diagnosis))
        y.extend(recommend_treatment_id(str(treatment)))
        y.extend(recommend_cancer_id(cancer))
        y.extend(recommend_infection_id(str(infection)))
        y.extend(recommend_medical_id(side_effect))

        b = unique_everseen(duplicates(y))
        # b = set(y)

        for i in a:
            if i != 'N/A':
                e.append(i)
            else:
                pass
            
        for i in b:
            if i != 'N/A':
                e.append(i)
            else:
                pass
        zone = request.POST.get('zone')
        

        # sfood= ['Idli','upma','Sada Dosa','Ragi','Sambar','uttappam ']
        # non_veg = ['Chicken','Chicken breast','Chicken Curry','Egg whole','Egg Omlette','Egg white','Egg yolk','egg curry',
        # 'Egg','Fish curry','Egg White']

        # if zone == 'North':
        #     for i in sfood:
        #         while i in e:
        #             e.remove(i)
        
        # if food == 'Veg':
        #     for i in non_veg:
        #         while i in e:
        #             e.remove(i)
                    
        # if side_effect == 'Diarrhea':
        #     for i in e:
        #         if i == 'Almond':
        #             e.remove(i)

    
        result = unique_everseen(duplicates(e))
        result = set(result)
        
        for i in result:
            bf.append(break_name(i))
        
        for i in result:
            LUNCH.append(lunch_name(i))

        for i in result:
            SUPPER.append(supper_name(i))

        for i in result:
            DINNER.append(dinner_name(i))

        for i in result:
            time.append(get_time_id(i))

        print(bf)
        print(LUNCH)
        print(SUPPER)
        print(DINNER)
        

        
        
    context = {'age':p_age,'gom':p_gom,'diagnosis':p_diagnosis,'treatment':p_treatment,'cancer':p_cancer,'result':result,'infection':p_infection,'medical':p_medical,'food':p_food,'zone':p_zone,
    'selected_age':age,'selected_gom':gom,'selected_diagnosis':diagnosis,'selected_treatment':treatment,'selected_cancer':cancer,'selected_infection':infection,
    'selected_side_effect':side_effect,'selected_food':food,'selected_zone':zone,'time':time}    
    return render(request,'diet.html',context=context)

# @api_view(['POST'])
# @authentication_classes([SessionAuthentication, BasicAuthentication])
# @permission_classes([IsAuthenticated])
@method_decorator(csrf_exempt,name='dispatch')
class DietAPIView(APIView):
    authentication_classes = [TokenAuthentication,SessionAuthentication,BasicAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self,request):
        print(request.user)     
        age = None
        gom = None
        diagnosis = None
        treatment = None
        cancer = None
        infection = None
        side_effect = None
        food = None
        zone = None
        return Response({"age":age,"gom":gom,"diagnosis":diagnosis,"treatment":treatment,"cancer":cancer,"infection":infection,
        "side_effect":side_effect,"food":food,"zone":zone})

    
    def post(self,request): 
        
        age = request.data.get('age')
        gom = request.data.get('gom')
        diagnosis = request.data.get('diagnosis')
        treatment = request.data.get('treatment')
        cancer = request.data.get('cancer')
        infection = request.data.get('infection')
        side_effect = request.data.get('side_effect')
        food_type = request.data.get('food_type')
        zone = request.data.get('zone')

        a = recommend_age_id(int(age))
        b = recommend_gom_id(str(gom))
        c = recommend_diagnosis_id(str(diagnosis))
        d = recommend_treatment_id(str(treatment))
        e = recommend_cancer_id(str(cancer))
        f = []
        for i in infection:
            f.append(recommend_infection_id(str(i)))
        g = []
        for i in side_effect:
            g.append(recommend_medical_id(str(i)))
    
        
        
        x = []
        y = []
        for i in a:
            x.append(i)
        for i in b:
            y.append(i)
        for i in c:
            y.append(i)
        for i in d:
            y.append(i)
        for i in e:
            y.append(i)
        for i in f:
            y.append(i)
        for i in g:
            y.append(i)

        def flatten(lis):
            for item in lis:
                if isinstance(item, Iterable) and not isinstance(item, str):
                    for x in flatten(item):
                        yield x
                else:        
                    yield item
                
        y = list(flatten(y))

        d2 = unique_everseen(duplicates(y))
        d1 = []
        for i in x:
            d1.append(i)
        for i in d2:
            d1.append(i)
        t_diet = unique_everseen(duplicates(d1))
        
        sfood= [593,594,885,909,892,893,894,885,921]
        non_veg = [318,321,316,319,332,875,324,1025,874,876,330,320,331,527,631,632,716,
        315,648,356,639,323,420,743,648,689,632,647,719,717,710,875,327,325,317,333,647,
        350,351,520,329,718,711,744,745,832,334,448,519,306,1028]          

        result = []
        time = []
        for i in t_diet:
            result.append(int(i))

        if food_type == 'Veg':
            for i in non_veg:
                while i in result:
                    result.remove(i)
        if zone == 'North':
            for o in sfood:
                while o in result:
                    result.remove(o)

        for i in side_effect:
            if i == 'Diarrhea':
                for i in result:
                    if i == 282 or 861:
                        result.remove(i)
        for i in result:
            time.append(get_time_id(i))
        
        
        return Response({"result":result,"time":time})


