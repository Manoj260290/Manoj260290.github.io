FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["src/Services/QAService/TechQA.QAService/TechQA.QAService.csproj", "src/Services/QAService/TechQA.QAService/"]
COPY ["src/SharedKernel/TechQA.SharedKernel/TechQA.SharedKernel.csproj", "src/SharedKernel/TechQA.SharedKernel/"]
RUN dotnet restore "src/Services/QAService/TechQA.QAService/TechQA.QAService.csproj"
COPY . .
WORKDIR "/src/src/Services/QAService/TechQA.QAService"
RUN dotnet build "TechQA.QAService.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TechQA.QAService.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TechQA.QAService.dll"]