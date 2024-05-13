using Microsoft.Azure.CognitiveServices.Vision.ComputerVision;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision.Models;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace WebAPI.Utils.OCR
{
    public class OcrService
    {
        private readonly string _subscriptionKey = "e255f8e9cf4c40e68f86618f480301f1";
        private readonly string _endpoint = "https://cvvitalhubg06.cognitiveservices.azure.com/";

        //Método para reconhecer os caracteres (texto) a partir de uma imagem
        public async Task<string> RecognizeTextAsync(Stream imageStream) 
        { 
            try
            {
                //Cria um client para API de Computer Vision
                var client = new ComputerVisionClient(new ApiKeyServiceClientCredentials(_subscriptionKey))
                { 
                    Endpoint = _endpoint 
                };  

                //Faz a chamada para a API
                var ocrResult = await client.RecognizePrintedTextInStreamAsync(true, imageStream);

                //Processa o resultado e retorna o texto reconhecido
                return ProcessRecognitionResult(ocrResult);
            }
            catch (Exception ex)
            {
                return "Erro ao reconhecer o texto" +  ex.Message;
            }
        }

        private static string ProcessRecognitionResult(OcrResult result)
        {
            string recognizedText = "";

            // Percorre todas as regiões 
            foreach (var region in result.Regions)
            {
                // Para cada região, percorre as linhas
                foreach (var line in region.Lines)
                {
                    // Para cada linha, percorre as palavras
                    foreach (var word in line.Words)
                    {
                        // Adiciona cada palavra ao texto, separando com espaço
                        recognizedText += word.Text + "";
                    }

                    // Quebra de linha ao final de cada linha
                    recognizedText += "\n";
                }
            }

            // Retorna o texto
            return recognizedText;
        }
    }
}
