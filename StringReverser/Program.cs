using System;
using System.Linq;
using System.Text;

namespace StringReverser
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("=== String Reverser Program ===\n");
            
            // Get input from user
            Console.Write("Enter a string to reverse: ");
            string input = Console.ReadLine();
            
            if (string.IsNullOrEmpty(input))
            {
                Console.WriteLine("No input provided. Using default string: 'Hello World'");
                input = "Hello World";
            }
            
            Console.WriteLine($"\nOriginal string: {input}");
            Console.WriteLine("=" + new string('=', input.Length + 17));
            
            // Method 1: Using Array.Reverse()
            string reversed1 = ReverseUsingArrayReverse(input);
            Console.WriteLine($"Method 1 (Array.Reverse): {reversed1}");
            
            // Method 2: Using StringBuilder
            string reversed2 = ReverseUsingStringBuilder(input);
            Console.WriteLine($"Method 2 (StringBuilder): {reversed2}");
            
            // Method 3: Using LINQ
            string reversed3 = ReverseUsingLinq(input);
            Console.WriteLine($"Method 3 (LINQ):         {reversed3}");
            
            // Method 4: Using for loop (manual)
            string reversed4 = ReverseUsingLoop(input);
            Console.WriteLine($"Method 4 (For Loop):     {reversed4}");
            
            // Method 5: Using recursion
            string reversed5 = ReverseUsingRecursion(input);
            Console.WriteLine($"Method 5 (Recursion):    {reversed5}");
            
            Console.WriteLine("\nProgram completed successfully!");
        }
        
        /// <summary>
        /// Reverses a string using Array.Reverse() method
        /// </summary>
        static string ReverseUsingArrayReverse(string input)
        {
            char[] charArray = input.ToCharArray();
            Array.Reverse(charArray);
            return new string(charArray);
        }
        
        /// <summary>
        /// Reverses a string using StringBuilder for efficient string manipulation
        /// </summary>
        static string ReverseUsingStringBuilder(string input)
        {
            StringBuilder sb = new StringBuilder();
            for (int i = input.Length - 1; i >= 0; i--)
            {
                sb.Append(input[i]);
            }
            return sb.ToString();
        }
        
        /// <summary>
        /// Reverses a string using LINQ Reverse() method
        /// </summary>
        static string ReverseUsingLinq(string input)
        {
            return new string(input.Reverse().ToArray());
        }
        
        /// <summary>
        /// Reverses a string using a simple for loop
        /// </summary>
        static string ReverseUsingLoop(string input)
        {
            string result = "";
            for (int i = input.Length - 1; i >= 0; i--)
            {
                result += input[i];
            }
            return result;
        }
        
        /// <summary>
        /// Reverses a string using recursion
        /// </summary>
        static string ReverseUsingRecursion(string input)
        {
            if (input.Length <= 1)
                return input;
            
            return input[input.Length - 1] + ReverseUsingRecursion(input.Substring(0, input.Length - 1));
        }
    }
}
