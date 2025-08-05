FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["src/ApiGateway/TechQA.ApiGateway/TechQA.ApiGateway.csproj", "src/ApiGateway/TechQA.ApiGateway/"]
COPY ["src/SharedKernel/TechQA.SharedKernel/TechQA.SharedKernel.csproj", "src/SharedKernel/TechQA.SharedKernel/"]
RUN dotnet restore "src/ApiGateway/TechQA.ApiGateway/TechQA.ApiGateway.csproj"
COPY . .
WORKDIR "/src/src/ApiGateway/TechQA.ApiGateway"
RUN dotnet build "TechQA.ApiGateway.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TechQA.ApiGateway.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TechQA.ApiGateway.dll"]