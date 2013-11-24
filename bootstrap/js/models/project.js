//// Filename: models/project
define([
  'underscore',
  
  'backbone',

  'XMLWriter'
  
], function(_,Backbone){

  var ProjectModel = Backbone.Model.extend({
  	
    defaults: {
    	
		
    },


    initialize: function(){

        console.log('starting model');
        console.log(this.span(1905,2002));
        this.ruleName='';
        this.ruleSetName='';
        this.counter = 2;
        this.level=1;
        this.params = {};
        //this.url="http://localhost/implicit/rules";
        //this.url="https://dw2.psyc.virginia.edu/implicit/rules";
        this.url="/implicit/rules";

        
        


        //The Conditions used by the program:
        //	cName:     Contidiotn name
        //  equal:     This is actually the operator
        //  equalXML:  The operator that will be written in the xml.
        //  Values:    The values for the condition.
        //  valuesXML: The actuall values that would be written in the xml.
        //  cType:     Wil the values been shown in a dropbox or label.
        //  data:      Any type of data, used to store constant type.
       
        this.conditions = [
        {   
            cName:'Sex',
            cNameXML:'sex',//fixed accoding to rule.
            equal:['Is','Is Not'],
            equalXML:['eq','neq'],
            values:['Male','Female'],
            valuesXML:['m','f'],
            cType:'dropdown'
        },

        {
            cName:'Month of birth',
            cNameXML:'birthmonth', //demographics
            equal:['>','<','=','>=','<=','!='],
            equalXML:['gt','lt','eq','gte','lte','neq'],
            values:['January','February','March','April','May','June','July','August','September','October','November','December'],
            valuesXML:['1','2','3','4','5','6','7','8','9','10','11','12'],
            data:{represent:'string'},
            cType:'dropdown'
        },

        {
            cName:'Year of birth',
            cNameXML:'birthyear',//fixed according to rules
            equal:['>','<','=','>=','<=','!='],
            equalXML:['gt','lt','eq','gte','lte','neq'],
            values:this.span(1905,2002),
            valuesXML:[],
            data:{represent:'int'},
            cType:'dropdown'
        },

        {
            cName:'Education',
            cNameXML:'education',//demographics
            equal:['>','<','=','>=','<=','!='],
            equalXML:['gt','lt','eq','gte','lte','neq'],
            values:['elementary school','junior high','some high school','high school graduate','some college','associates degree','bachelors degree','some graduate school','masters degree','JD','MD','PhD','other advanced degree','MBA'],
            valuesXML:['1','2','3','4','5','6','7','8','9','10','11','12','13','14'],
            data:{represent:'int'},
            cType:'dropdown'
        },

        {
            cName:'Major field of study',
            cNameXML:'major',//demographics
            equal:['Is','Is Not'],
            equalXML:['eq','neq'],
            values:[

                'Biological sciences/life sciences',

                'Business',

                'Communications',

                'Computer and information sciences',

                'Education',

                'Engineering, mathematics, physical sciences/technologies',

                'Health professions or related sciences',

                'Humanities/liberal arts',

                'Law or legal studies',

                'Psychology',

                'Social sciences or history',

                'Visual or performing arts',

                'Other'


            ],
            valuesXML:['1','2','3','4','5','6','7','8','9','10','11','12','13'],
            data:{represent:'int'},
            cType:'dropdown'
        },

      
        {
            cName:'Political Identity',
            cNameXML:'politicalid',//demographics
            equal:['>','<','=','>=','<=','!='],
            equalXML:['gt','lt','eq','gte','lte','neq'],
            values:['Strongly conservative','Moderately conservative','Slightly conservative','moderate/neutral','Slightly liberal','Moderately liberal','Strongly liberal'],
            valuesXML:['-3','-2','-1','0','1','2','3'],
            data:{represent:'int'},
            cType:'dropdown'
        },

        {
            cName:'Religiosity',
            cNameXML:'religionid',//demographics
            equal:['>','<','=','>=','<=','!='],
            equalXML:['gt','lt','eq','gte','lte','neq'],
            values:['Very Religious','Moderately Religious','Somewhat Religious','Not at all Religious'],
            valuesXML:['4','3','2','1'],
            data:{represent:'int'},
            cType:'dropdown'
        },

        {
            cName:'Postal Code',
            cNameXML:'zipcode',//demographics
            equal:['>','<','=','>=','<=','!='],
            equalXML:['gt','lt','eq','gte','lte','neq'],
            values:[],
            valuesXML:[],
            data:{represent:'int'},
            cType:'label'
        },
       
        {
            cName:'Race',
            cNameXML:'raceomb',//demographics
            equal:['Is','Is Not'],
            equalXML:['eq','neq'],
            values:['American Indian/Alaska Native','East Asian','South Asian','Native Hawaiian or other Pacific Islander',
            'Black or African American','White','More than one race - Black/White','More than one race - Other','Other or Unknown'],
            valuesXML:['1','2','3','4','5','6','7','8','9'],
            data:{represent:'string'},
            cType:'dropdown'
        },

        {
            cName:'Ethnicity',
            cNameXML:'ethnicityomb',//taken from demographics
            equal:['Is','Is Not'],
            equalXML:['eq','neq'],
            values:['Hispanic or Latino','Not Hispanic or Latino','Unknown'],
            valuesXML:['1','2','3'],
            cType:'dropdown'
        },
         {
            cName:'General Occupation',
            cNameXML:'genoccupation',//taken from demographics
            equal:['Is','Is Not'],
            equalXML:['eq','neq'],
            values:[

                'Administrative Support',
                'Arts/Design/Entertainment/Sports',
                'Business',
                'Computer/Math',
                'Construction/Extraction',
                'Education',
                'Engineers/Architects',
                'Farming, Fishing, Forestry',
                'Healthcare',
                'Homemaker or Parenting',
                'Legal',
                'Maintenance',
                'Management',
                'Military',
                'Production',
                'Protective Service',
                'Repair/Installation',
                'Retired',
                'Sales',
                'Science',
                'Service and Personal Care',
                'Student',
                'Social Service',
                'Transportation',
                'Unemployed'

            ],
            valuesXML:[

            '43','27','13','15','47','25','17','45','2931','00-0000','23','37','11','55',
            '51','33','49','99-0001','41','19','39','25-9999','21','53','99-9999'
            
            ],
            cType:'dropdown'
        },
    
        {
            cName:'Specific Occupation',
            cNameXML:'occupation',//demographics
            equal:['Is','Is Not'],
            equalXML:['eq','neq'],
            values:[


///administrator support 43-000   
'Supervisors',
'Financial Clerks',
'Information and Records',
'Recording, Scheduling, Dispatching, Distributing',
'Secretaries and Assistants',
'Other Support (data entry, office clerk, proofreaders)',

//Arts - 27-x000

'Art and Design',
'Entertainers and Performers',
'Media and communication',
'Media Equipment workers',
'Other Arts/Design/Entertainment/Sports', 

//Business -13-x000

'Business - Business Operations',
'Business - Financial Specialists',
'Other business',  

//compuet/math

'Computer Specialists',
'Math Scientists',
'Math Technicians',
'Other math/computer', 

//construction
'Supervisors',
'Construction Trades',
'Helpers, Construction Trades',
'Extraction (e.g., mining, oil)',
'Other',

//education
'Administrators',  
'Postsecondary Teachers',
'Primary, Secondary, and Special Ed Teachers',
'Other teachers and instructors',
'Librarians, Curators, Archvists',
'Other education, training, and library occupations',

//student
'Student',



//engineers
'Architects, Surveyors, Cartographers',
'Engineers',
'Drafters, Engineering and Mapping Technicians',
'Other Engineer/Architect', 

//farming
'Supervisors',
'Agriculture',
'Fishing and Hunting',
'Forest, Conservation, Logging',
'Other Farming, Fishing, Forestry',

//food 

'Supervisors',
'Cooks and food prep',
'servers',
'Other food service workers (e.g., dishwasher, host)',

//Healthcare

'Diagnosing and Treating Practitioners (MD, Dentist, etc.)',
'Technologists and Technicians',
'Nursing and Home Health Assistants',
'Occupational and Physical Therapist Assistants',
'Other healthcare support',


//parenting
'Homemaker or Parenting',

//legal
'Legal - Lawyers, Judges, and related workers',
'Legal - Legal support workers',
'Other legal', 

//maintenance

'Building and Grounds Supervisors',
'Building workers',
'Grounds Maintenance',
'Other maintenance',  


//managment
'Top Executives',
'Advertising, Sales, PR, Marketing',
'Operations Specialists',
'Other Management Occupations',

//military
'Officer and Tactical Leaders/Managers',
'First-line enlisted supervisor/manager',
'enlisted tactical, air/weapons, crew, other',

//production
'Supervisors',
'Assemblers and Fabricators',
'Food processing',
'Metal and Plastic',
'Printers',
'Textile, Apparel, Furnishings',
'Woodworkers',
'Plant and System Operators',
'Other',


//Protective Services 
'Supervisors',
'Fire fighting and prevention',
'Law Enforcement',
'Other (e.g., security, lifeguards, crossing guards)',


//Repair/Installation
'Supervisors',
'Electrical and Electronic',
'Vehicle and Mobile Equipment',
'Other repair or installation',  


'Retired',

//sales
'Supervisors',
'Retail',
'Sales Representatives and Services',
'Wholesale and Manufacturing',
'Other sales (e.g., telemarketers, real estate)',


//science
'Life Scientists',
'Physical scientists',
'Social Scientists',
'Life, Physical, Social Science Technicians',
'Other science', 

//personal care
'Supervisors',
'Animal Care',
'Entertainment attendants',
'Funeral Service',
'Personal Appearance',
'Transportation, Tourism, Lodging',
'Other service',

//social
'Counselors, Social Workers, Community specialists',
'Religious Workers',//23
'Other social service', 

//transportation
'Supervisors',
'Air Transportation',
'Motor Vehicle Operators',
'Rail Transport',
'Water Transport',
'Material Moving',
'Other',

'Unemployed'

],



valuesXML:[
'43-1000','43-3000','43-4000','43-5000','43-6000','43-9000',//administrators
'27-1000','27-2000','27-3000','27-4000','27-9999',//arts
'13-1000','13-2000', '13-9999',//business
'15-1000','15-2000','15-3000','15-9999', //computer
'47-1000','47-2000','47-3000','47-5000','47-4000',//construction
'25-5000','25-1000','25-2000','25-3000','25-4000','25-9000',//education
'25-9999',//student
'17-1000','17-2000','17-3000','17-9999',//engineers
'45-1000','45-2000','45-3000','45-4000','45-9000',//forestry
'35-1000','35-2000','35-3000','35-9000',//food
'29-1000','29-2000','31-1000','31-2000','31-9000',//healthcare
'00-0000',//parenting
'23-1000','23-2000','23-9999',//legal
'37-1000','37-2000','37-3000','37-9999',//maintenance
'11-0000','11-2000','11-3000','11-9000',//managment
'55-1000','55-2000','55-3000',//military
'51-1000','51-2000','51-3000','51-4000','51-5000','51-6000','51-7000','51-8000','51-9000',//production
'33-1000','33-2000','33-3000','33-9000',//Protective
'49-1000','49-2000','49-3000','49-9000',//Repair
'99-0001',//retired
'41-1000','41-2000','41-3000','41-4000','41-9000',//sales
'19-1000','19-2000','19-3000','19-4000','19-9999',//science
'39-1000','39-2000','39-3000','39-4000','39-5000','39-6000','39-9000',//personal care
'21-1000','21-2000','21-9999',//social
'53-1000','53-2000','53-3000','53-4000','53-5000','53-7000','53-6000',//transportation
'99-9999',//unemployed
],

cType:'dropdown'
},

{
    cName:'Citizenship',
    cNameXML:'citizenship',
    equal:['Is','Is Not'],
    equalXML:['eq','neq'],
    values:[

     'U.S.A.','Afghanistan','Albania',
    'Algeria','American Samoa','Andorra',
    'Angola','Anguilla','Antarctica',
    'Antigua And Barbuda','Argentina','Armenia',
    'Aruba','Australia','Austria',
    'Azerbaijan','Bahamas','Bahrain',
    'Bangladesh','Barbados','Belarus',
    'Belgium','Belize','Benin',
    'Bermuda','Bhutan','Bolivia',
    'Bosnia and Herzegovina','Botswana','Bouvet Island',
    'Brazil','British Indian Ocean Territory','Brunei',
    'Bulgaria','Burkina Faso','Burundi',
    'Cambodia','Cameroon','Canada',
    'Cape Verde','Cayman Islands','Central African Republic',
    'Chad','Chile','China',
    'Christmas Island','Cocos (Keeling) Islands','Colombia',
    'Comoros','Congo','Congo, Democractic Republic of the',
    'Cook Islands','Costa Rica','Cote DIvoire (Ivory Coast)',
    'Croatia (Hrvatska)','Cuba','Cyprus',
    'Czech Republic','Denmark','Djibouti',
    'Dominica','Dominican Republic','East Timor',
    'Ecuador','Egypt','El Salvador',
    'Equatorial Guinea','Eritrea','Estonia',
    'Ethiopia','Falkland Islands (Islas Malvinas)','Faroe Islands',
    'Fiji Islands','Finland','France',
    'French Guiana','French Polynesia','French Southern Territories',
    'Gabon','Gambia, The','Georgia',
    'Germany','Ghana','Gibraltar',
    'Greece','Greenland','Grenada',
    'Guadeloupe','Guam','Guatemala',
    'Guinea','Guinea-Bissau','Guyana',
    'Haiti','Heard and McDonald? Islands','Honduras',
    'Hong Kong S.A.R.','Hungary','Iceland',
    'India','Indonesia','Iran',
    'Iraq','Ireland','Israel',
    'Italy','Jamaica','Japan',
    'Jordan','Kazakhstan','Kenya',
    'Kiribati','Korea','Korea, North',
    'Kuwait','Kyrgyzstan','Laos',
    'Latvia','Lebanon','Lesotho',
    'Liberia','Libya','Liechtenstein',
    'Lithuania','Luxembourg','Macau S.A.R.',
    'Macedonia, Former Yugoslav Republic of','Madagascar','Malawi',
    'Malaysia','Maldives','Mali',
    'Malta','Marshall Islands','Martinique',
    'Mauritania','Mauritius','Mayotte',
    'Mexico','Micronesia','Moldova',
    'Monaco','Mongolia','Montserrat',
    'Morocco','Mozambique','Myanmar',
    'Namibia','Nauru','Nepal',
    'Netherlands Antilles','Netherlands, The','New Caledonia',
    'New Zealand','Nicaragua','Niger',
    'Nigeria','Niue','Norfolk Island',
    'Northern Mariana Islands','Norway','Oman',
    'Pakistan','Palau','Panama',
    'Papua new Guinea','Paraguay','Peru',
    'Philippines','Pitcairn Island','Poland',
    'Portugal','Puerto Rico','Qatar',
    'Reunion','Romania','Russia',
    'Rwanda','Saint Helena','Saint Kitts And Nevis',
    'Saint Lucia','Saint Pierre and Miquelon','Saint Vincent And The Grenadines',
    'Samoa','San Marino','Sao Tome and Principe',
    'Saudi Arabia','Senegal','Seychelles',
    'Sierra Leone','Singapore','Slovakia',
    'Slovenia','Solomon Islands','Somalia',
    'South Africa','South Georgia And The South Sandwich Islands','Spain',
    'Sri Lanka','Sudan','Suriname',
    'Svalbard And Jan Mayen Islands','Swaziland','Sweden',
    'Switzerland','Syria','Taiwan',
    'Tajikistan','Tanzania','Thailand',
    'Togo','Tokelau','Tonga',
    'Trinidad And Tobago','Tunisia','Turkey',
    'Turkmenistan','Turks And Caicos Islands','Tuvalu',
    'Uganda','Ukraine','United Arab Emirates',
    'United Kingdom','U.S.A.','United States Minor Outlying Islands',
    'Uruguay','Uzbekistan','Vanuatu',
    'Vatican City State (Holy See)','Venezuela','Vietnam',
    'Virgin Islands (British)','Virgin Islands (US)','Wallis And Futuna Islands',
    'Yemen','Yugoslavia','Zambia',
    'Zimbabwe'




    ],

   valuesXML:[

   'us','af','al',
   'dz','as','ad',
   'ao','ai','aq',
   'ag','ar','am',
   'aw','au','at',
   'az','bs','bh',
   'bd','bb','by',
   'be','bz','bj',
   'bm','bt','bo',
   'ba','bw','bv',
   'br','io','bn',
   'bg','bf','bi',
   'kh','cm','ca',
   'cv','ky','cf',
   'td','cl','cn',
   'cx','cc','co',
   'km','cg','cd',
   'ck','cr','ci',
   'hr','cu','cy',
   'cz','dk','dj',
   'dm','do','tp',
   'ec','eg','sv',
   'gq','er','ee',
   'et','fk','fo',
   'fj','fi','fr',
   'gf','pf','tf',
   'ga','gm','ge',
   'de','gh','gi',
   'gr','gl','gd',
   'gp','gu','gt',
   'gn','gw','gy',
   'ht','hm','hn',
   'hk','hu','is',
   'in','id','ir',
   'iq','ie','il',
   'it','jm','jp',
   'jo','kz','ke',
   'ki','kr','kp',
   'kw','kg','la',
   'lv','lb','ls',
   'lr','ly','li',
   'lt','lu','mo',
   'mk','mg','mw',
   'my','mv','ml',
   'mt','mh','mq',
   'mr','mu','yt',
   'mx','fm','md',
   'mc','mn','ms',
   'ma','mz','mm',
   'na','nr','np',
   'an','nl','nc',
   'nz','ni','ne',
   'ng','nu','nf',
   'mp','no','om',
   'pk','pw','pa',
   'pg','py','pe',
   'ph','pn','pl',
   'pt','pr','qa',
   're','ro','ru',
   'rw','sh','kn',
   'lc','pm','vc',
   'ws','sm','st',
   'sa','sn','sc',
   'sl','sg','sk',
   'si','sb','so',
   'za','gs','es',
   'lk','sd','sr',
   'sj','sz','se',
   'ch','sy','tw',
   'tj','tz','th',
   'tg','tk','to',
   'tt','tn','tr',
   'tm','tc','tv',
   'ug','ua','ae',
   'uk','us','um',
   'uy','uz','vu',
   'va','ve','vn',
   'vg','vi','wf',
   'ye','yu','zm',
   'zw'
    
],     
cType:'dropdown'
},

{
    cName:'Residence',
    cNameXML:'residence',
    equal:['Is','Is Not'],
    equalXML:['eq','neq'],
    values:[
    'U.S.A.','Afghanistan','Albania',
    'Algeria','American Samoa','Andorra',
    'Angola','Anguilla','Antarctica',
    'Antigua And Barbuda','Argentina','Armenia',
    'Aruba','Australia','Austria',
    'Azerbaijan','Bahamas','Bahrain',
    'Bangladesh','Barbados','Belarus',
    'Belgium','Belize','Benin',
    'Bermuda','Bhutan','Bolivia',
    'Bosnia and Herzegovina','Botswana','Bouvet Island',
    'Brazil','British Indian Ocean Territory','Brunei',
    'Bulgaria','Burkina Faso','Burundi',
    'Cambodia','Cameroon','Canada',
    'Cape Verde','Cayman Islands','Central African Republic',
    'Chad','Chile','China',
    'Christmas Island','Cocos (Keeling) Islands','Colombia',
    'Comoros','Congo','Congo, Democractic Republic of the',
    'Cook Islands','Costa Rica','Cote DIvoire (Ivory Coast)',
    'Croatia (Hrvatska)','Cuba','Cyprus',
    'Czech Republic','Denmark','Djibouti',
    'Dominica','Dominican Republic','East Timor',
    'Ecuador','Egypt','El Salvador',
    'Equatorial Guinea','Eritrea','Estonia',
    'Ethiopia','Falkland Islands (Islas Malvinas)','Faroe Islands',
    'Fiji Islands','Finland','France',
    'French Guiana','French Polynesia','French Southern Territories',
    'Gabon','Gambia, The','Georgia',
    'Germany','Ghana','Gibraltar',
    'Greece','Greenland','Grenada',
    'Guadeloupe','Guam','Guatemala',
    'Guinea','Guinea-Bissau','Guyana',
    'Haiti','Heard and McDonald? Islands','Honduras',
    'Hong Kong S.A.R.','Hungary','Iceland',
    'India','Indonesia','Iran',
    'Iraq','Ireland','Israel',
    'Italy','Jamaica','Japan',
    'Jordan','Kazakhstan','Kenya',
    'Kiribati','Korea','Korea, North',
    'Kuwait','Kyrgyzstan','Laos',
    'Latvia','Lebanon','Lesotho',
    'Liberia','Libya','Liechtenstein',
    'Lithuania','Luxembourg','Macau S.A.R.',
    'Macedonia, Former Yugoslav Republic of','Madagascar','Malawi',
    'Malaysia','Maldives','Mali',
    'Malta','Marshall Islands','Martinique',
    'Mauritania','Mauritius','Mayotte',
    'Mexico','Micronesia','Moldova',
    'Monaco','Mongolia','Montserrat',
    'Morocco','Mozambique','Myanmar',
    'Namibia','Nauru','Nepal',
    'Netherlands Antilles','Netherlands, The','New Caledonia',
    'New Zealand','Nicaragua','Niger',
    'Nigeria','Niue','Norfolk Island',
    'Northern Mariana Islands','Norway','Oman',
    'Pakistan','Palau','Panama',
    'Papua new Guinea','Paraguay','Peru',
    'Philippines','Pitcairn Island','Poland',
    'Portugal','Puerto Rico','Qatar',
    'Reunion','Romania','Russia',
    'Rwanda','Saint Helena','Saint Kitts And Nevis',
    'Saint Lucia','Saint Pierre and Miquelon','Saint Vincent And The Grenadines',
    'Samoa','San Marino','Sao Tome and Principe',
    'Saudi Arabia','Senegal','Seychelles',
    'Sierra Leone','Singapore','Slovakia',
    'Slovenia','Solomon Islands','Somalia',
    'South Africa','South Georgia And The South Sandwich Islands','Spain',
    'Sri Lanka','Sudan','Suriname',
    'Svalbard And Jan Mayen Islands','Swaziland','Sweden',
    'Switzerland','Syria','Taiwan',
    'Tajikistan','Tanzania','Thailand',
    'Togo','Tokelau','Tonga',
    'Trinidad And Tobago','Tunisia','Turkey',
    'Turkmenistan','Turks And Caicos Islands','Tuvalu',
    'Uganda','Ukraine','United Arab Emirates',
    'United Kingdom','U.S.A.','United States Minor Outlying Islands',
    'Uruguay','Uzbekistan','Vanuatu',
    'Vatican City State (Holy See)','Venezuela','Vietnam',
    'Virgin Islands (British)','Virgin Islands (US)','Wallis And Futuna Islands',
    'Yemen','Yugoslavia','Zambia',
    'Zimbabwe'],

   valuesXML:[
   'us','af','al',
   'dz','as','ad',
   'ao','ai','aq',
   'ag','ar','am',
   'aw','au','at',
   'az','bs','bh',
   'bd','bb','by',
   'be','bz','bj',
   'bm','bt','bo',
   'ba','bw','bv',
   'br','io','bn',
   'bg','bf','bi',
   'kh','cm','ca',
   'cv','ky','cf',
   'td','cl','cn',
   'cx','cc','co',
   'km','cg','cd',
   'ck','cr','ci',
   'hr','cu','cy',
   'cz','dk','dj',
   'dm','do','tp',
   'ec','eg','sv',
   'gq','er','ee',
   'et','fk','fo',
   'fj','fi','fr',
   'gf','pf','tf',
   'ga','gm','ge',
   'de','gh','gi',
   'gr','gl','gd',
   'gp','gu','gt',
   'gn','gw','gy',
   'ht','hm','hn',
   'hk','hu','is',
   'in','id','ir',
   'iq','ie','il',
   'it','jm','jp',
   'jo','kz','ke',
   'ki','kr','kp',
   'kw','kg','la',
   'lv','lb','ls',
   'lr','ly','li',
   'lt','lu','mo',
   'mk','mg','mw',
   'my','mv','ml',
   'mt','mh','mq',
   'mr','mu','yt',
   'mx','fm','md',
   'mc','mn','ms',
   'ma','mz','mm',
   'na','nr','np',
   'an','nl','nc',
   'nz','ni','ne',
   'ng','nu','nf',
   'mp','no','om',
   'pk','pw','pa',
   'pg','py','pe',
   'ph','pn','pl',
   'pt','pr','qa',
   're','ro','ru',
   'rw','sh','kn',
   'lc','pm','vc',
   'ws','sm','st',
   'sa','sn','sc',
   'sl','sg','sk',
   'si','sb','so',
   'za','gs','es',
   'lk','sd','sr',
   'sj','sz','se',
   'ch','sy','tw',
   'tj','tz','th',
   'tg','tk','to',
   'tt','tn','tr',
   'tm','tc','tv',
   'ug','ua','ae',
   'uk','us','um',
   'uy','uz','vu',
   'va','ve','vn',
   'vg','vi','wf',
   'ye','yu','zm',
   'zw'
],  
cType:'dropdown'},
{
            cName:'Study',
            cNameXML:'study',
            equal:['Completed','Started but not Completed','Never Taken or Not Completed','If Started Completed','Started Studies','Previous Study ID'],
            equalXML:[],
            values:[],
            valuesXML:[],
            data:{represent:'string'},
            cType:'label'
},
{
            cName:'General Religious Affiliation',
            cNameXML:'religion',//demographics
            equal:['Is','Is Not'],
            equalXML:['eq','neq'],
            values:['Buddhist/Confucian/Shinto','Christian: Catholic or Orthodox','Christian: Protestant or Other','Hindu','Jewish','Muslim/Islamic','Not Religious','Other Religion'],
            valuesXML:['buddhist','catholic','protestant','hindu','jewish','muslim','none','otherrelig'],
            data:{represent:'string'},
            cType:'dropdown'
},
{
            cName:'Specific Religious Affiliation',
            cNameXML:'relfamily',//demographics
            equal:['Is','Is Not'],
            equalXML:['eq','neq'],
            values:[

            //protestant
            'Adventist',
            'Anglican/Episcopalian', 
            'Baptist',
            'Brethren',
            'Church/Churches of Christ',
            'Church of God',
            'Congregationalist',
            'Methodist/Wesleyan',
            'Latter Day Saints',
            'Lutheran',
            'Pentecostal/Holiness/Charismatic',
            'Presbyterian or Reformed',
            'Other Christian',
            'Nondenominational/Independent',

            //catholic

            'Orthodox: Antiochian',
            'Orthodox: Armenian',
            'Orthodox: Assyrian',
            'Orthodox: Coptic',
            'Orthodox: Eastern',
            'Orthodox: Greek',
            'Orthodox: Romanian',
            'Orthodox: Russian',
            'Orthodox: Serbian',
            'Roman Catholic',
            'Other Catholic',
            'Other Orthodox',

            //None
            'Agnostic',
            'Atheist',
            'Deist',
            'Spiritual, No Organized Religion',
            'Theist',
            'Other Non-Religious',


            //Buddhist
            'Buddhist: Mahayana',
            'Buddhist: Theravada',
            'Buddhist: Tibetan',
            'Chinese Folk Religion',
            'Confucian',
            'Shinto',
            'Taoist',
            'Tenrikyo',
            'Other Buddhist/Confucian/Shinto',


            //Hindu

            'Neo-Hindu/Reform Hindu',
            'Shaivite',
            'Veerashaiva/Lingayat',
            'Vaishnavite',
            'Other Hindu',

            //OtherRelig

            'African Tribal Religion',
            'Bahai',
            'Indigenous',
            'Interfaith',
            'Jain',
            'Native American',
            'Pagan or Neo-Pagan',
            'Rastafarian',
            'Scientologist',
            'Sikh',
            'Spiritist',
            'Unitarian-Universalist',
            'Vodoun',
            'Zoroastrian',
            'Other: Not listed',

            //Jewish

            'Conservative',
            'Orthodox',
            'Reconstructionist',
            'Reform',
            'Secular',
            'Other Jewish',

 
            //Muslim

            'Ahmadi',
            'Druze',
            'Sunni',
            'Shiite',
            'Other Muslim',







            ],
            valuesXML:[

            //protestant
            'adventist',
            'anglican',
            'baptist',
            'brethren',
            'churchesofchrist', 
            'churchofgod',
            'congregationalist', 
            'methodist',
            'lds',
            'lutheran',
            'pentecostal',
            'presbyterian',
            'otherchristian',
            'nondenominational',

             //catholic
            'orthodox: antiochian',
            'orthodox: armenian',
            'orthodox: assyrian',
            'orthodox: coptic',
            'orthodox: eastern',
            'orthodox: greek',
            'orthodox: romanian',
            'orthodox: russian',
            'orthodox: serbian',
            'roman catholic',
            'other catholic',
            'other orthodox',

            //None
            'agnostic',
            'atheist',
            'deist',
            'spiritual, no organized religion',
            'theist',
            'other non-religious',


            //Buddhist
            'buddhist: mahayana',
            'buddhist: theravada',
            'buddhist: tibetan',
            'chinese folk religion',
            'confucian',
            'shinto',
            'taoist',
            'tenrikyo',
            'other buddhist/confucian/shinto',


            //Hindu

            'neo-hindu/reform hindu',
            'shaivite',
            'veerashaiva/lingayat',
            'vaishnavite',
            'other hindu',

            //OtherRelig

            'african tribal religion',
            'baha\'i',
            'indigenous',
            'interfaith',
            'jain',
            'native american',
            'pagan or neo-pagan',
            'rastafarian',
            'scientologist',
            'sikh',
            'spiritist',
            'unitarian-universalist',
            'vodoun',
            'zoroastrian',
            'other: not listed',

            //Jewish

            'conservative',
            'orthodox',
            'reconstructionist',
            'reform',
            'secular',
            'other jewish',

 
            //Muslim

            'ahmadi',
            'druze',
            'sunni',
            'shiite',
            'other muslim',












            ],
            data:{represent:'string'},
            cType:'dropdown'
},
{
            cName:'Specific Religious Denomination',
            cNameXML:'reldenom',//demographics
            equal:['Is','Is Not'],
            equalXML:['eq','neq'],
            values:[
            // Protestant/OtherChristian
            'Amish',
            'Christian Scientist',
            'Friend/Quaker',
            'Mennonite',
            'Metropolitan Community Churches',
            'Religious Society of Friends (Conservative)',
            'Salvation Army',
            'Unitarian-Universalist',
            'Other Christian',

            // Protestant/Nondenominational
            'Calvary Chapel',
            'Disciples of Christ',
            'Churches of Christ in Christian Union',
            'Evangelical',
            'Grace Gospel Fellowship',
            'Independent Fundamentalist',
            'Interdenominational Church',
            'Metropolitan Community Churches',
            'Nondenominational church',
            'United Church',
            'Just a Christian',

            //Protestant/Adventist
            'Jehovah\'s Witness',
            'Seventh Day Adventist',
            'Other Adventist',

            //Protestant/Anglican
            'Anglican',
            'Church of England',
            'Church of Ireland',
            'Episcopalian',
            'Other Anglican',

            //Protestant/Baptist
            'American Baptist Association',
            'Baptist Bible Fellowship',
            'Baptist General Conference', 
            'Conservative Baptist Association',
            'Free Will Baptist',
            'Fundamentalist Baptist', 
            'General Association of Regular Baptists',
            'Independent Baptist (no denominational ties)',
            'Missionary Baptist', 
            'National Baptist Convention',
            'Northern Baptist',
            'Primitive Baptist',
            'Progressive Baptist',
            'Southern Baptist',
            'Other Baptist Church',
            'Baptist: Don\'t know which',

            //Protestant/Brethren
            'Church of the Brethren',
            'Evangelical United Brethren',
            'Grace Brethren',
            'Plymouth Brethren',
            'United Brethren/United Brethren in Christ',
            'Other Brethren',
            'Brethren: Don\'t know which',

            //Protestant/ChurchesofChrist
            'Christian Churches & Churches of Christ',
            'Church of Christ',
            'United Church of Christ',
            'Other Church of Christ',
            'Church of Christ: Don\'t know which',
   
            //Protestant/ChurchofGod
            'Church of God (Anderson, IN)',
            'Church of God (Cleveland, TN)',
            'Church of God in Christ',
            'Church of the Living God',
            'Pentecostal Church of God',
            'Worldwide Church of God',
            'Other Church of God',
            'Church of God: Don\'t know which',

            //Protestant/LDS
            'Church of Jesus Christ of Latter Day Saints',
            'Community of Christ',
            'Other Latter Day Saint',
            'LDS: Don\'t know which',

            //Protestant/Methodist

            'African Methodist Episcopal',
            'African Methodist Episcopal (Zion)',
            'Christian Methodist Episcopal',
            'Church of the Nazarene',
            'Evangelical Methodist',
            'Evangelical Covenant (Church)',
            'Free Methodist',
            'United Methodist',
            'Wesleyan Methodist',
            'Other Methodist Church',
            'Other Wesleyan Church',
            'Methodist: Don\'t know which',

            //Protestant//Lutheran

            'Evangelical Lutheran',
            'Latvian Lutheran',
            'Lutheran Church: Missouri Synod',
            'Lutheran Church: Wisconsin Synod',
            'Other Lutheran Church',
            'Lutheran: Don\'t know which',

            //Protestant/Pentecostal
            'Assemblies of God',
            'Christian & Missionary Alliance',
            'Church of God of Prophecy', 
            'Foursquare Gospel',
            'Full Gospel Fellowship',
            'Holiness Church of God',
            'House of Prayer',
            'Open Bible Churches',
            'Pentecostal Apostolic',
            'Pilgrim Holiness',
            'Pentecostal Assemblies of the World',
            'Pentecostal Holiness Church',
            'Pentecostal Church of God',
            'Triumph Church of God',
            'United Holiness',
            'Other Apostolic',
            'Other Charismatic',
            'Other Holiness/Church of Holiness',
            'Other Pentecostal',

            //Protestant/Presbyterian
            'Cumberland Presbyterian Church',
            'Evangelical Presbyterian Church',
            'Orthodox Presbyterian Church',
            'Presbyterian Church in America (PCA)',
            'Presbyterian Church in the USA (PCUSA)',
            'United Presbyterian Church in the USA',
            'Other Presbyterian Church',
            'Presbyterian: Don\'t know which',
            'Dutch Reformed',
            'Evangelical and Reformed Church',
            'International Council of Community Churches',
            'Protestant Reformed Churches',
            'Reformed Church in America',
            'Reformed United Church of Christ',
            'Other Reformed Church',
            'Reformed: Don\'t know which'            




            ],
            valuesXML:[
            // Protestant/OtherChristian
            'amish',
            'christian scientist',
            'friend/quaker',
            'mennonite',
            'metropolitan community churches',
            'religious society of friends (Conservative)',
            'salvation army',
            'unitarian-universalist',
            'other christian',

            // Protestant/Nondenominational
            'calvary chapel',
            'disciples of christ',
            'churches of christ in christian union',
            'evangelical',
            'grace gospel fellowship',
            'independent fundamentalist',
            'interdenominational church',
            'metropolitan community churches',
            'nondenominational church',
            'united church',
            'just a christian',

            //Protestant/Adventist
            'jehovah\'s witness',
            'seventh day adventist',
            'other adventist',

            //Protestant/Anglican
            'anglican',
            'church of england',
            'church of ireland',
            'episcopalian',
            'other anglican',

            //Protestant/Baptist
            'american baptist association',
            'baptist bible fellowship',
            'baptist general conference', 
            'conservative baptist association',
            'free will baptist',
            'fundamentalist baptist', 
            'general association of regular baptists',
            'independent baptist (no denominational ties)',
            'missionary baptist', 
            'national baptist convention',
            'northern baptist',
            'primitive baptist',
            'progressive baptist',
            'southern baptist',
            'other baptist church',
            'baptist: don\'t know which',

            //Protestant/Brethren
            'church of the brethren',
            'evangelical united brethren',
            'grace brethren',
            'plymouth brethren',
            'united brethren/united brethren in christ',
            'other brethren',
            'brethren: don\'t know which',

            //Protestant/ChurchesofChrist
            'christian churches & churches of christ',
            'church of christ',
            'united church of christ',
            'other church of christ',
            'church of christ: don\'t know which',
   
            //Protestant/ChurchofGod
            'church of god (anderson, in)',
            'church of god (cleveland, tn)',
            'church of god in christ',
            'church of the living god',
            'pentecostal church of god',
            'worldwide church of god',
            'other church of god',
            'church of god: don\'t know which',

            //Protestant/LDS
            'church of jesus christ of latter day saints',
            'community of christ',
            'other latter day saint',
            'lds: don\'t know which',

            //Protestant/Methodist

            'african methodist episcopal',
            'african methodist episcopal (zion)',
            'christian methodist episcopal',
            'church of the nazarene',
            'evangelical methodist',
            'evangelical covenant (church)',
            'free methodist',
            'united methodist',
            'wesleyan methodist',
            'other methodist church',
            'other wesleyan church',
            'methodist: don\'t know which',

            //Protestant//Lutheran

            'evangelical lutheran',
            'latvian lutheran',
            'lutheran church: missouri synod',
            'lutheran church: wisconsin synod',
            'other lutheran church',
            'lutheran: don\'t know which',

            //Protestant/Pentecostal
            'assemblies of god',
            'christian & missionary alliance',
            'church of god of prophecy', 
            'foursquare gospel',
            'full gospel fellowship',
            'holiness church of god',
            'house of prayer',
            'open bible churches',
            'pentecostal apostolic',
            'pilgrim holiness',
            'pentecostal assemblies of the world',
            'pentecostal holiness church',
            'pentecostal church of god',
            'triumph church of god',
            'united holiness',
            'other apostolic',
            'other charismatic',
            'other holiness/church of holiness',
            'other pentecostal',

            //Protestant/Presbyterian
            'cumberland presbyterian church',
            'evangelical presbyterian church',
            'orthodox presbyterian church',
            'presbyterian church in america (pca)',
            'presbyterian church in the usa (pcusa)',
            'united presbyterian church in the usa',
            'other presbyterian church',
            'presbyterian: don\'t know which',
            'dutch reformed',
            'evangelical and reformed church',
            'international council of community churches',
            'protestant reformed churches',
            'reformed church in america',
            'reformed united church of christ',
            'other reformed church',
            'reformed: don\'t know which'            






            ],
            data:{represent:'string'},
            cType:'dropdown'
}


];
        //The Rows used by the program:
        //
        //  cName:     Contidiotn name
        //  equal:     This is actually the operator
        //  equalXML:  The operator that will be written in the xml.
        //  alues:    The values for the condition.
        //  valuesXML: The actuall values that would be written in the xml.
        //  cType:     Wil the values been shown in a dropbox or label.
        //  data:      Any type of data, used to store constant type.

        this.TRows = [
              {ID:'rowB0l0',typeR:'B',level:0,rowValue:{booleanValue:'All'},cType:'dropdown'},
              {ID:'rowC1l1',typeR:'C',level:1,rowValue:{dropdownOne:'Citizenship',dropdownTwo:'Is',dropdownThree:'U.S.A.'},cType:'dropdown'},
              {ID:'rowEB2l0',typeR:'EB',level:0,rowValue:{booleanValue:'End All'},cType:'dropdown'}


        ];
        
        
      

    	
        this.controls =[
        {controlName:'DeleteRow',html:'<button class="btn btn-mini link" id="button2" data-original-title="Delete Row"><i class="icon-minus-sign"></i></button>'},
        {controlName:'BooleanDropBox',html:'<div id="booleanDiv" class="btn-group"><button class="btn dropdown-toggle btn-mini" data-toggle="dropdown" href="#">'+
                'Boolean Logic<span class="caret"></span></button><ul class="dropdown-menu"><li id="liOr"><a>ANY</a></li><li id="liOr"><a>All</a></li></ul></div>'},
        {controlName:'DropTwo',html:'<div id="droptwoDiv" class="btn-group btn-mini"><button class="btn dropdown-toggle btn-mini" data-toggle="dropdown" href="#">'+
                 'Expression <span class="caret"></span></button><ul class="dropdown-menu"></ul></div>'},
        {controlName:'Buttons',html:'<div id="buttons" style="float:right;"><div id="buttonsDiv" class="btn-group btn-mini"><button class="btn dropdown-toggle btn-mini" data-toggle="dropdown" href="#"><i class="icon-plus-sign"></i>'+
                       '<span class="caret"></span></button><ul class="dropdown-menu"><li id="liOr1"><a>Add Condition</a></li><li id="liOr1"><a>Add All</a></li>'+
                       '<li id="liOr1"><a>Add Any</a></li><li id="liOr2"><a>End Any</a></li><li id="liOr3"><a>End All</a></li></ul></div><button class="btn btn-mini link" id="button2" data-original-title="Delete Row"><i class="icon-minus-sign"></i></button>'+
                       '</div>'},
        {controlName:'DropThree',html:'<div id="dropthreeDiv" class="btn-group"><button class="btn dropdown-toggle btn-mini" data-toggle="dropdown" href="#">'+
                        'Value <span class="caret"></span></button><ul class="dropdown-menu"></ul></div>'},
        {controlName:'Clabel',html:'<input id="conditionLabel" type="text" class="inputMysize" style="padding-left:10px" />'}


        ];

        this.templates = {

            usWhites26: '<?xml version="1.0" encoding="UTF-8"?>'+
'<!DOCTYPE ruleset PUBLIC "dtd/SRML-simpleRules.dtd" "../dtd/SRML-simpleRules.dtd" >'+
'<ruleset>'+
'    <rule name="WhitesAndUSOnly">'+
'        <conditionPart>'+
'            <simpleCondition className="Demographics">'+
'                <naryExp operator="and">'+
'                    <binaryExp operator="eq">'+
'                        <field name="raceomb"/>'+
'                        <constant type="string" value="6"/>'+
'                    </binaryExp>'+
'                    <binaryExp operator="eq">'+
'                        <field name="citizenship"/>'+
'                        <constant type="string" value="us"/>'+
'                    </binaryExp>'+
'                </naryExp>'+
'            </simpleCondition>'+
'        </conditionPart>'+
'        <actionPart>'+
'            <assignment>'+
'                <variable name="weight"/>'+
'                <constant type="int" value="26"/>'+
'            </assignment>'+
'        </actionPart>'+
'    </rule>'+
'</ruleset>',
        Over18Priority26:'<?xml version="1.0" encoding="UTF-8"?>'+
'<!DOCTYPE ruleset PUBLIC "dtd/SRML-simpleRules.dtd" "../dtd/SRML-simpleRules.dtd" >'+
'<ruleset name="old104">'+
'    <rule name="old104">'+
'           <conditionPart>'+
'            <simpleCondition className="Demographics">'+
'                <naryExp operator="and">'+
'                    <binaryExp operator="lte">'+
'                        <field name="birthyear"/>'+
'                        <constant type="int" value="1995"/>'+
'                    </binaryExp>'+
'                </naryExp>'+
'            </simpleCondition>'+
'        </conditionPart>'+
'    <actionPart>'+
'        <assignment>'+
'            <variable name="odds"/>'+
'            <constant type="int" value="26"/>'+
'        </assignment>'+
'    </actionPart>'+
'    </rule>'+
'</ruleset>',

        Teachman75:'<?xml version="1.0" encoding="UTF-8"?>'+
'<!DOCTYPE ruleset PUBLIC "dtd/SRML-simpleRules.dtd" "../dtd/SRML-simpleRules.dtd" >'+
'<ruleset name="Priority26us">'+
'    <rule name="Priority26us">'+
'           <conditionPart>'+
'            <simpleCondition className="Demographics">'+
'                <naryExp operator="and">'+
'                    <binaryExp operator="eq">'+
'                        <field name="citizenship"/>'+
'                        <constant type="string" value="us"/>'+
'                    </binaryExp>'+
'              <binaryExp operator="lte">'+
'                        <field name="birthyear"/>'+
'                        <constant type="int" value="1936"/>'+
'                    </binaryExp>'+
'                    <binaryExp operator="gte">'+
'                        <field name="birthyear"/>'+
'                        <constant type="int" value="1927"/>'+
'                    </binaryExp>'+
'            </naryExp>'+
'            </simpleCondition>'+
'        </conditionPart>'+
'    <actionPart>'+
'        <assignment>'+
'            <variable name="odds"/>'+
'            <constant type="int" value="120"/>'+
'        </assignment>'+
'    </actionPart>'+
'    </rule>'+
'</ruleset>'



        };





        this.xml ='';
    	
        this.summeryText='';
        this.parseParams();
       
    },
    parseParams:function(){
        console.log('starting params');
        var prmstr = window.location.search.substr(1);
        var prmarr = prmstr.split ("&");
        console.log(prmarr);
        

        for ( var i = 0; i < prmarr.length; i++) {
            var tmparr = prmarr[i].split("=");
            console.log(tmparr);
            this.params[tmparr[0]] = tmparr[1];
            console.log('key '+tmparr[0]);
            console.log('value '+this.params[tmparr[0]]);
            
       }

    },
    
   getHtml:function(controlName){
    var result;
     _.each(this.controls,function(v,i){ 
            if (v.controlName===controlName){
                result = v.html; 

            } 
        });
     return result;

   },
    span:function(since,until){
        
        var result=[];
        for(var i=since;i<=until;i++){
            result.push(i);

        } 
        
        return result;
    },
    clearModel:function(){
         this.TRows = [
         {ID:'rowB0l0',typeR:'B',level:0,rowValue:{booleanValue:''}}

         ];
         this.level=0;
         this.counter=1;
    },
    loadDefaultModel:function(){
        this.TRows = [
              {ID:'rowB0l0',typeR:'B',level:0,rowValue:{booleanValue:'All'},cType:'dropdown'},
              {ID:'rowC1l1',typeR:'C',level:1,rowValue:{dropdownOne:'Citizenship',dropdownTwo:'Is',dropdownThree:'U.S.A.'},cType:'dropdown'},
              {ID:'rowEB2l0',typeR:'EB',level:0,rowValue:{booleanValue:'End All'},cType:'dropdown'}


        ];
        this.level=0
        this.counter=3;


    },
    changeValues:function(row,arg){

        if (arg==='w'){
            
            if (row.rowValue.dropdownTwo==='Completed'){

                row.rowValue.dropdownOne = row.rowValue.dropdownThree;
                row.rowValue.dropdownThree = 'c';
                row.rowValue.dropdownTwo = 'eq';
                
            //'Started','Finished','Not Finished','Not Started'],
            }
            if (row.rowValue.dropdownTwo==='Started but not Completed'){

                row.rowValue.dropdownOne = row.rowValue.dropdownThree;
                row.rowValue.dropdownThree = 'i';
                row.rowValue.dropdownTwo = 'eq';


            }
            if (row.rowValue.dropdownTwo==='Never Taken or Not Completed'){

                row.rowValue.dropdownOne = row.rowValue.dropdownThree;
                row.rowValue.dropdownThree = 'c';
                row.rowValue.dropdownTwo = 'neq';

            }
            if (row.rowValue.dropdownTwo==='If Started Completed'){

                row.rowValue.dropdownOne = row.rowValue.dropdownThree;
                row.rowValue.dropdownThree = 'i';
                row.rowValue.dropdownTwo = 'neq';


            }
            if (row.rowValue.dropdownTwo==='Started Studies'){

                row.rowValue.dropdownOne = 'started_studies';
                //row.rowValue.dropdownThree = 'i';
                row.rowValue.dropdownTwo = 'eq';


            }
            if (row.rowValue.dropdownTwo==='Previous Study ID'){

                row.rowValue.dropdownOne = 'previous_study_id';
                //row.rowValue.dropdownThree = 'i';
                row.rowValue.dropdownTwo = 'eq';


            }

        }
        if (arg==='r'){

            if (row.rowValue.dropdownThree === 'c' && row.rowValue.dropdownTwo === 'eq'){

                row.rowValue.dropdownThree = row.rowValue.dropdownOne;
                row.rowValue.dropdownOne = 'Study';
                row.rowValue.dropdownTwo = 'Completed';
            }
            if (row.rowValue.dropdownThree === 'i' && row.rowValue.dropdownTwo === 'eq'){

                row.rowValue.dropdownThree = row.rowValue.dropdownOne;
                row.rowValue.dropdownOne = 'Study';
                row.rowValue.dropdownTwo = 'Started but not Completed';
            }
            if (row.rowValue.dropdownThree === 'c' && row.rowValue.dropdownTwo === 'neq'){

                row.rowValue.dropdownThree = row.rowValue.dropdownOne;
                row.rowValue.dropdownOne = 'Study';
                row.rowValue.dropdownTwo = 'Never Taken or Not Completed';
            }
            if (row.rowValue.dropdownThree === 'i' && row.rowValue.dropdownTwo === 'neq'){

                row.rowValue.dropdownThree = row.rowValue.dropdownOne;
                row.rowValue.dropdownOne = 'Study';
                row.rowValue.dropdownTwo = 'If Started Completed';
            }
            if (row.rowValue.dropdownOne === 'started_studies'){

                row.rowValue.dropdownOne = 'Study';
                row.rowValue.dropdownTwo = 'Started Studies';
            }
            if (row.rowValue.dropdownOne === 'previous_study_id'){

                
                row.rowValue.dropdownOne = 'Study';
                row.rowValue.dropdownTwo = 'Previous Study ID';
            }

        }

    },

    changeStudyW:function(){

        var rows = this.TRows;
        for(var i=0;i<rows.length;i++){

            if (rows[i].rowValue.dropdownOne === 'Study'){
                this.changeValues(rows[i],'w');
            }


        }

    },
    isStudy:function(row){

        if (row.rowValue.dropdownThree==='c' || row.rowValue.dropdownThree==='i') return true;
        if (row.rowValue.dropdownOne==='started_studies' || row.rowValue.dropdownOne==='previous_study_id') return true;
        return false;

    },

    isZip:function(row){

        if (row.rowValue.dropdownOne==='zipcode') return true;
        return false;

    },

    changeStudyR:function(){

        var rows = this.TRows;
        for(var i=0;i<rows.length;i++){

            if (this.isStudy(rows[i])){
                this.changeValues(rows[i],'r');
                rows[i].cType='label';

            }
            if(this.isZip(rows[i])){
                rows[i].cType='label';



            }


        }

    },

    makeXML:function(){
        var self = this;
        self.changeStudyW();
        var xw = new XMLWriter( 'UTF-8', '1.0' );
        xw.formatting = 'indented';//add indentation and newlines
        xw.indentChar = ' ';//indent with spaces
        xw.indentation = 4;//add 2 spaces per level

        xw.writeStartDocument( );
        //doctype for some reason doesnt work disabled for now..
        //research\library\dtd\SRML-simpleRules.dtd
        //xw.writeDocType('"https://dw2.psyc.virginia.edu/implicit/research/library/dtd/SRML-simpleRules.dtd"');
        //PUBLIC "dtd/SRML-simpleRules.dtd" "../dtd/SRML-simpleRules.dtd"
        xw.writeDocType('"dtd/SRML-simpleRules.dtd" "../dtd/SRML-simpleRules.dtd"');
        //xw.writeDocType('"http://localhost/bootstrapProjects/SRML-simpleRules.dtd"');
        //xw.writeDocType();
        //xw.writeDocType('"items.dtd"');
        //start xml body
        xw.writeStartElement( 'ruleset' );
        xw.writeAttributeString( 'name', this.ruleSetName);
            xw.writeStartElement( 'rule' );
            xw.writeAttributeString( 'name', this.ruleName);
                xw.writeStartElement( 'conditionPart');
                    xw.writeStartElement( 'simpleCondition');
                     xw.writeAttributeString( 'className', 'Demographics');
                         _.each(this.TRows,function(v,i){
                         var bValue; 
                            if(v.typeR=='B'){
                               
                                if (v.rowValue.booleanValue==='All'){
                                    bValue ='and';
                                }else{
                                    if (v.rowValue.booleanValue==='Any'){
                                        bValue='or';
                                    }
                                }
                                xw.writeStartElement( 'naryExp' );
                                xw.writeAttributeString( 'operator', bValue);

                            }
                            if(v.typeR=='C'){
                                xw.writeStartElement( 'binaryExp' );
                                xw.writeAttributeString( 'operator', self.translateToXML(v.rowValue.dropdownOne,'2',v.rowValue.dropdownTwo));
                                   xw.writeStartElement( 'field' );
                                   xw.writeAttributeString( 'name', self.translateToXML(v.rowValue.dropdownOne,'1',v.rowValue.dropdownOne));
                                  xw.writeEndElement();
                                  xw.writeStartElement( 'constant' );
                                   xw.writeAttributeString( 'type', self.getConstantType(v.rowValue.dropdownOne));
                                   xw.writeAttributeString( 'value', self.translateToXML(v.rowValue.dropdownOne,'3',v.rowValue.dropdownThree));
                                  xw.writeEndElement();//end constant
                                xw.writeEndElement();//end binaryExp
                            }
                            if(v.typeR=='EB'){
                                xw.writeEndElement();//end binary

                            }

                        });
                    xw.writeEndElement();//end simplecondition
                xw.writeEndElement();//end conditionpart
           
                xw.writeStartElement( 'actionPart' );
                    xw.writeStartElement( 'assignment' );
                        xw.writeStartElement( 'variable' );
                        xw.writeAttributeString( 'name', 'odds');
                        xw.writeEndElement();
                        xw.writeStartElement( 'constant' );
                        xw.writeAttributeString( 'type', 'int');
                        xw.writeAttributeString( 'value', '26');
                    xw.writeEndElement();//end assigmnet
                xw.writeEndElement();//end actionpart

            xw.writeEndElement();//end rule
        xw.writeEndElement();//end ruleset
        console.log(xw.flush());
        
        //console.log(xw.getDocument());
        //xw.close();
        //this.saveToDisk(xw.flush());
        return xw;

    },
    closeXW:function(xw){
        xw.close();

    },

    sendToServer:function(xml,path,name){
        
        
        var data={};
        var path = this.params.folder;
        data.path='/user/'+path;
        data.FileName =name;
        data.submit='false';
        data.realPath = '';
        console.log('name: '+data.FileName+ ', folder: '+data.path);
        data.xml = xml;
        console.log(xml);
        $.ajax({
              type: 'POST',
              url: this.url,
              data: JSON.stringify(data),
              success: function(result) {

                      var res = result.length;
                      if(res === 3){
                        alert('File was saved successfully.');
                      }else{
                        alert('File was not saved on our servers, check your study folder name.');
                      }
                          
                  },
              fail: function(jqXHR, textStatus, errorThrown){
                  console.log(jqXHR);
                  console.log(textStatus);
                  console.log(errorThrown);

                  alert('fail');

              },
              dataType: 'text',
              async:false
        });

       //  $.post(this.url,JSON.stringify(data),function(data){
       //     // alert(data);
       //      alert('success');
       // },"html").fail(function ( jqXHR, textStatus, errorThrown){
       //   console.log(jqXHR);
       //   console.log(textStatus);
       //   console.log(errorThrown);

       //  alert('fail');




       // });
        // promise.fail(function(){
        //     //$('.alert').alert();
        //     //$('.alert').show();
        //     alert('File was not saved on our servers, check your study folder name.');
        //    // $('#Errormodal').modal('toggle');

        // });
        // // }).fail( function(xhr, textStatus, errorThrown) {
        // // alert(xhr.responseText);}
        // promise.done(function(){

        //     alert('File was saved successfully.');


        // });
        


    },
    getConstantType:function(cond){

        for(var i=0;i<this.conditions.length;i++){
            if (this.conditions[i].cName===cond){

                if(this.conditions[i].data != undefined && this.conditions[i].data != null ){

                    return this.conditions[i].data.represent;
                }else{
                    return 'string';
                }
            }

        }
        if (cond==='started_studies') return 'int';
        return 'string';//default to string if you dont find the condition.

    },

    translateFromXML:function(cond,dropDown,value){

        for(var i=0;i<this.conditions.length;i++){

            if (this.conditions[i].cNameXML===cond){

                if(dropDown==='1'){
                   return this.conditions[i].cName;

                }
                if(dropDown==='2'){
                    for(var j=0;j<this.conditions[i].equalXML.length;j++){

                        if(this.conditions[i].equalXML[j]===value){
                            return this.conditions[i].equal[j];
                        }


                    }
                    return value;

                }
                if(dropDown==='3'){


                    for(var j=0;j<this.conditions[i].valuesXML.length;j++){

                        if(this.conditions[i].valuesXML[j]===value){
                            return this.conditions[i].values[j];
                        }


                    }
                    return value;
                }


            }

        }
        return value;



    },
    translateToXML:function(cond,dropDown,value){
        
        for(var i=0;i<this.conditions.length;i++){

            if (this.conditions[i].cName===cond){

                

                if(dropDown==='1'){
                    return this.conditions[i].cNameXML;

                }
                if(dropDown==='2'){

                    for(var j=0;j<this.conditions[i].equal.length;j++){

                        if(this.conditions[i].equal[j]===value){
                            return this.conditions[i].equalXML[j];
                        }


                    }


                }
                if(dropDown==='3'){

                    for(var j=0;j<this.conditions[i].values.length;j++){

                        if(this.conditions[i].values[j]===value){
                            if(this.conditions[i].valuesXML!=undefined && this.conditions[i].valuesXML!=null){

                                return this.conditions[i].valuesXML[j];

                            }else{
                                return value;
                            }
                            
                        }

                     }
                     return value;

                }


            }
            

        }
        return value;

    },
    saveToDisk:function(text){
        var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
        var name = this.ruleName;
        saveAs(blob,name+'.xml');


    },

    formValidation:function(callback){

        ////validation that the number of all/any correspond to end all/end any
        var numberOfAll=0;
        var numberOfAny=0;
        var numberOfEndAll=0;
        var numberOfEndAny=0;
        var conditionError=false;
        var errorMsg='';

        for (var i=0;i<this.TRows.length;i++){
            var row = this.TRows[i];
            if (row.typeR==='B'){
                
                if (row.rowValue.booleanValue==='All'){
                    numberOfAll++;
                }
                if (row.rowValue.booleanValue==='Any'){
                    numberOfAny++;
                }

            }
            if(row.typeR==='EB'){
                
                if(row.rowValue.booleanValue==='End All'){
                    numberOfEndAll++;
                }
                if(row.rowValue.booleanValue==='End Any'){
                    numberOfEndAny++;
                }


            }

        }
        if (numberOfAll!=numberOfEndAll || numberOfAny!=numberOfEndAny){

            conditionError=true;
            errorMsg="Missing End Tag";

        } 
        ///////////validation that all conditions are set
         for (var i=0;i<this.TRows.length;i++){
        
            var row = this.TRows[i];
        
            if (row.typeR==='C'){

                
                var rowVal =row.rowValue;
                if (rowVal.dropdownOne===null || rowVal.dropdownOne===undefined || rowVal.dropdownOne ==='' || rowVal.dropdownOne==='Condition'){

                    conditionError=true;
                    errorMsg="Missing End Tag";

                }
                if (rowVal.dropdownTwo===null || rowVal.dropdownTwo===undefined || rowVal.dropdownTwo ==='' || rowVal.dropdownTwo==='Expression'){
                    conditionError=true;
                    errorMsg="Missing End Tag";
                }

                if (rowVal.dropdownThree===null || rowVal.dropdownThree===undefined || rowVal.dropdownThree ==='' || rowVal.dropdownThree==='Value'){
                    conditionError=true;
                    errorMsg="Missing End Tag";
                }

            }
            


        }

        callback(errorMsg,conditionError);


    },

    isDescendant:function(parent, child) {
     var node = child.parentNode;
     while (node != null) {
         if (node === parent) {
             return true;
         }
         node = node.parentNode;
     }
     return false;
    },
    childOf:function(p,c){while((c=c.parentNode)&&c!==p);return !!c},

    loadTemplate:function(name){

        this.TRows=[];
        var xmlDom;
        var text = this.templates[name];
        console.log(text);
        if (window.DOMParser){
             var parser = new DOMParser();
             xmlDom = parser.parseFromString(text, "text/xml");
         
        }
        else // Internet Explorer
        {
           xmlDom=new ActiveXObject("Microsoft.XMLDOM");
           xmlDom.async=false;
           xmlDom.loadXML(txt);
        }

        this.loadXML(xmlDom);



    },
    
    loadFile:function(f,callback){

        var myReader = new FileReader();
        var self = this;
        self.TRows=[];
         
        myReader.onloadend = function(event) {
         
            var text = event.target.result;
            var xmlDom;
            if (window.DOMParser){
              var parser = new DOMParser();
              xmlDom = parser.parseFromString(text, "text/xml");
         
            }
            else // Internet Explorer
            {
                xmlDom=new ActiveXObject("Microsoft.XMLDOM");
                xmlDom.async=false;
                xmlDom.loadXML(txt);
            }

            self.loadXML(xmlDom);
            callback();

          
        };
        myReader.onerror = function(e) {
          console.log(e);
        };
        try{
            myReader.readAsText(f);
            }
        catch(err){
            console.log(err);
        }
             
       

    },
    loadXML:function(xmlDom){

        var self=this;
        var x=xmlDom.getElementsByTagName("naryExp");//"note");//"naryExp");
            console.log('x');
            console.log(x);
            var node = x[0];//get first naryExp
            if (node===undefined){// no nary exp could be there is only one condition
                x = xmlDom.getElementsByTagName("binaryExp");
                node = x[0];
                self.parseXML(node);
            }else{
                self.parseXML(node);//parse x[0]
                var j=1;
                for(var i=0;i<x.length-1,j<x.length;){

                     if (self.isDescendant(x[i],x[j])){
                        j++;
                     }else{
                        node =x[j];
                        self.parseXML(node);
                        i=j;

                     }


                }
               
            }
            self.level=0;
            self.counter ++;
            console.log('node');
            console.log(node);
            console.log(self.TRows);
            self.changeStudyR();
            console.log(self.TRows);


    },
    parseXML:function(node){

        if (node.nodeName === 'naryExp'){

            var oprenad = node.attributes.getNamedItem("operator").nodeValue;
            oprenad=this.changeOperator(oprenad);
            this.addB(this.counter,this.level,'',oprenad);
            this.counter++;
            this.level++;

        
       
            var childNodes=node.childNodes;
            var firstChild= node.firstChild;
            console.log(firstChild.nodeName)
            for (var i=0;i<childNodes.length;i++)
            {
                if (firstChild.nodeType==1)
                {
                    console.log(firstChild.nodeName);

                    this.enterbinary(firstChild);
                    if (firstChild.nodeName ==='naryExp'){
                        
                        this.parseXML(firstChild);
                        //this.addEB(this.counter,this.level,'',this.changeOperatorEnd(firstChild.attributes.getNamedItem("operator").nodeValue));
                        //this.level--;
                        this.counter++;
                    }

                }

                firstChild=firstChild.nextSibling;
            }
            this.level--;
            this.addEB(this.counter,this.level,'',this.changeOperatorEnd(node.attributes.getNamedItem("operator").nodeValue));
        }else{
            this.enterbinary(node);
        }
            
            
    },

    enterbinary:function(firstChild){


        if (firstChild.nodeName ==='binaryExp'){

            var operand = firstChild.attributes.getNamedItem("operator").nodeValue;
            var fieldNameXML = firstChild.childNodes[1].attributes.getNamedItem("name").nodeValue;
            fieldName = this.translateFromXML(fieldNameXML,'1',fieldNameXML);
            operand = this.translateFromXML(fieldNameXML,'2',operand);
            var constantType = firstChild.childNodes[3].attributes.getNamedItem("type").nodeValue;
            var constantvalue = firstChild.childNodes[3].attributes.getNamedItem("value").nodeValue;
            constantvalue = this.translateFromXML(fieldNameXML,'3',constantvalue);
            var id = this.addC(this.counter,this.level,'');
            this.updateOne(id,fieldName);
            this.updateTwo(id,operand);
            this.updateThree(id,constantvalue);
            this.counter++;
        }


    },
     changeOperator:function(opr){
        
        if (opr==='and'){
            return 'All';
        }
        if(opr==='or'){
            return 'Any';
        }

     },
     changeOperatorEnd:function(opr){
        
        
        if (opr==='and'){
            return 'End All';
        }
        if(opr==='or'){
            return 'End Any';
        }

     },

    setConditionName: function(nameC) {
        this.set({ name:nameC });
    },
    setEqual: function(Obj) {
        this.set({ equal:Obj });
    },
    setConditionValues: function(valuesObj) {
        this.set({ values:valuesObj });
    },
    findRow: function(id){

    },
    addRow:function(){

    },
    deleteRow:function(){

    },
    setRowText:function(id,text){
        _.each(this.TRows,function(v,i){ 
            if (v.ID===id) v.rtext=text; 
        });
    },
    getSummeryText:function(){
        return this.summeryText;
    },
    //
    addC:function(counter,level,id){
        var row ={};
        var rID = 'rowC' + counter + 'l'+level;
            row.ID = rID;
            row.typeR = 'C';
            row.level=level;
            row.rowValue = {
                dropdownOne:'Condition',
                dropdownTwo:'Expression',
                dropdownThree:'Value'

            };
        var index;
        if(id!=undefined && id!=''){//enter after id

             _.each(this.TRows,function(v,i){ 
                if (v.ID===id){
                    index=i;
                    if(v.typeR==='B'){
                        row.level=v.level+1; 
                        //alert(row.level);
                    }else{
                        row.level=v.level; 
                    }
                } 
            });
        this.TRows.splice(index+1,0,row);        
        }else{//enter in the end
            
            this.TRows.push(row);
        }
        return rID;
    },
    addB:function(counter,level,id,value){
        var row ={};
        var rID = 'rowB' + counter + 'l'+level;
        row.ID = rID;
        row.typeR = 'B';
        row.level=level;
        row.rowValue = {
            booleanValue:value
        };
        var index;
        if(id!=undefined && id!=''){//enter after id

             _.each(this.TRows,function(v,i){ 
            if (v.ID===id){
                index=i; 
                if(v.typeR==='B'){
                       row.level=v.level+1; 
                        //alert(row.level);
                }else{
                        row.level=v.level; 
                }
            } 
        });
        this.TRows.splice(index+1,0,row);        
        }else{//enter in the end
            
            this.TRows.push(row);
        }
    },
    addEB:function(counter,level,id,setText){
        var row ={};
        var rID = 'rowEB' + counter + 'l'+level;
        row.ID = rID;
        row.typeR = 'EB';
        row.level=level;
        row.rowValue = {
            booleanValue:setText
        };
        var index;
        if(id!=undefined && id!=''){//enter after id

             _.each(this.TRows,function(v,i){ 
            if (v.ID===id){
                index=i; 
                if (v.level===0 || v.typeR==='B' || v.typeR==='EB'){
                    row.level = v.level;
                }else{
                    row.level = v.level-1;
                }
               

            } 
        });
        this.TRows.splice(index+1,0,row);        
        }else{//enter in the end
            
            this.TRows.push(row);
        }

    },
    updateB:function(rID,value){
        var row ={};
       
        _.each(this.TRows,function(v,k){

          if (v.ID===rID){
            v.rowValue.booleanValue = value;

          } 
          
        })
    },
    updateOne:function(rID,value){
        var row ={};
       
        _.each(this.TRows,function(v,k){
          if (v.ID===rID){
            v.rowValue.dropdownOne = value;
            v.rowValue.dropdownTwo = 'Expression';
            v.rowValue.dropdownThree = 'Value';
            if (value==='Postal Code'||value==='Study'){
                v.cType = 'label';
                v.rowValue.dropdownThree = '';
            }else{
                v.cType = 'dropdown';
                v.rowValue.dropdownThree = 'Value';
            }

          } 
        })
    },
    updateTwo:function(v1,v2){
        var row ={};
        var rID = v1;
        var value = v2;
        _.each(this.TRows,function(v,k){
          if (v.ID===rID) v.rowValue.dropdownTwo = value;
        })
    },

    updateThree:function(v1,v2){
        var row ={};
        var rID = v1;
        var value = v2;
        _.each(this.TRows,function(v,k){
          if (v.ID===rID) v.rowValue.dropdownThree = value;
        
        })
    },
    remove:function(rID){
              
        this.TRows = _.reject(this.TRows, function(obj){ return obj.ID===rID; });
        

    },
    getType:function(id){
        var result = '';
        _.each(this.TRows,function(v,k){
          if (v.ID===id){
            result= v.typeR;

          } 
        
        })
        return result;

    },
    test:function(){
        alert('this is test');
    }
 


  });
  // Return the model for the module
  return ProjectModel;
});





/*


 'AF','AL','DZ','AS','AD','AO','AI','AQ','AG','AR','AM','AW','AU','AT','AZ',
    'BS','BH','BD','BB','BY','BE','BZ','BJ','BM','BT','BO','BA','BW','BV','BR','IO','BN','BG','BF','BI','KH',
    'CM','CA','CV','KY','CF','TD','CL','CN','CX','CC','CO','KM','CG','CD','CK','CR','CI','HR','CU','CY','CZ',
    'DK','DJ','DM','DO','TP','EC','EG','SV','GQ','ER','EE','ET','FK','FO','FJ','FI','FR','GF','PF','TF',
    'GA','GM','GE','DE','GH','GI','GR','GL','GD','GP','GU','GT','GN','GW','GY',
    'HT','HM','HN','HK','HU','IS','IN','ID','IR','IQ','IE','IL','IT','JM','JP','JO','KZ','KE','KI','KR','KP','KW','KG',
    'LA','LV','LB','LS','LR','LY','LI','LT','LU','MO','MK','MG','MW','MY','MV','ML','MT','MH','MQ','MR','MU',
    'YT','MX','FM','MD','MC','MN','MS','MA','MZ','MM','NA','NR','NP','AN','NL','NC','NZ','NI','NE','NG','NU','NF','MP','NO','OM',
    'PK','PW','A','PG','PY','PE','PH','PN','PL','PT','PR','QA','RE','RO','RU','RW','SH','KN','LC','PM','VC','WS',
    'SM','ST','SA','SN','SC','SC','SL','SG','SK','SI','SB','SO','ZA','GS','ES','LK','SD','SR','SJ','SZ','SE','CH','SY',
    'TW','TJ','TZ','TH','TG','TK','TO','TT','TN','TR','TM','TC','TV','UG','UA','AE','UK','US','UM','UY','UZ',
    'VU','VA','VE','VN','VG','VI','WF','YE','YU','ZM','ZW'
    {
            cName:'Household Income',
            cNameXML:'household income',
            equal:['>','<','=','=>','=<','!='],
            equalXML:['gt','lt','eq','gte','lte','neq'],
            values:['25,000 (U.S. $)','25,000 - 49,999','50,000 - 74,999','75,000 - 149,999','> 150,000','99 = Dont know'],
            valuesXML:['1','2','3','4','5','99'],
            data:{represent:'string'},
            cType:'dropdown'
        },

        {
            cName:'English fluency',
            cNameXML:'english fluency',
            equal:['>','<','=','=>','=<','!='],
            equalXML:['gt','lt','eq','gte','lte','neq'],
            values:['English is my primary language','English fluent - speak/read it regularly','English fluent - speak/read infrequently','English knowledgable','not fluent'],
            valuesXML:['4','3','2','1','0'],
            data:{represent:'string'},
            cType:'dropdown'
        },

*/