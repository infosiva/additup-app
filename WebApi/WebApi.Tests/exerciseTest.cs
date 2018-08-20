using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using WebApi.Controllers;
using WebApi.Model;

namespace WebApi.Tests
{
    [TestClass]
    public class exerciseTest
    {
        [TestMethod]
        public void CreateExerciseTest()
        {
            
            var exerciseDataObj = Exercise.createExercise();
            
            Assert.IsNotNull(exerciseDataObj.questions);
            Assert.IsNotNull(exerciseDataObj.questions[0].options);
            Assert.AreEqual(4,exerciseDataObj.questions[0].options.Length);
            Assert.AreEqual(15, exerciseDataObj.questions.Length);
        }
    }
}
