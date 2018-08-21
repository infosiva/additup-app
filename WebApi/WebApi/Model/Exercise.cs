using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using AutoMapper;
using System.IO;
using Microsoft.DotNet.PlatformAbstractions;
using System.Collections;

namespace WebApi.Model
{
    public class Exercise
    {
        public string id;
        public string name;
        public string description;
        public question[] questions;
        public string TestDuration;

        public Exercise(IHostingEnvironment host) {
            HostingEnvironment = host;
        }
        public static IHostingEnvironment HostingEnvironment { get; set; }

        // Method to create an exercise of type a + b = ?
        public static Exercise createExercise()
        {

            var exerciseList= JsonConvert.DeserializeObject<Exercise>(getJSONData());
            var shuffledArr = Shuffle<question>(exerciseList.questions);
            exerciseList.questions = shuffledArr;
            return exerciseList;
        }

        private static T[] Shuffle<T>(T[] OriginalArray)
        {
            var matrix = new SortedList();
            var r = new Random();
            

            for (var x = 0; x <= OriginalArray.Length -1; x++)
            {
                var i = r.Next(0, OriginalArray.Length); ;

                while (matrix.ContainsKey(i)) { i = r.Next(0, OriginalArray.Length); }

                matrix.Add(i, OriginalArray[x]);
            }

            var OutputArray = new T[OriginalArray.Length];

            matrix.Values.CopyTo(OutputArray, 0);

            return OutputArray;
        }

        public static string getJSONData()
        {
           return System.IO.File.ReadAllText(GetTestDataFolder("data") + "/exercise-data.json");
        }

        public static string GetTestDataFolder(string testDataFolder)
        {
            string startupPath = ApplicationEnvironment.ApplicationBasePath;
            var pathItems = startupPath.Split(Path.DirectorySeparatorChar);
            var pos = pathItems.Reverse().ToList().FindIndex(x => string.Equals("bin", x));
            string projectPath = String.Join(Path.DirectorySeparatorChar.ToString(), pathItems.Take(pathItems.Length - pos - 1));
            return Path.Combine(projectPath, testDataFolder);
        }
    }
    public class question
    {
        public int id;
        public string name;
        public option[] options;
    }

    public class option
    {
        public int id;
        public int questionId;
        public string name;
        public bool isAnswer;
    }
}
