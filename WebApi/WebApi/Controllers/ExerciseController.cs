using System;
using Microsoft.AspNetCore.Mvc;
using WebApi.Model;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    public class ExerciseController : Controller
    {
        // GET api/exercise
        [HttpGet]
        public JsonResult GetExercise()
        {
            var convertedOBJ = Exercise.createExercise();
            return new JsonResult(convertedOBJ);
        }

        // POST api/exercise
        [HttpPost]
        public Exercise PostAnswer([FromBody]string value)
        {
            throw new NotImplementedException();
        }       
    }
}