FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["src/Services/SectionService/TechQA.SectionService/TechQA.SectionService.csproj", "src/Services/SectionService/TechQA.SectionService/"]
COPY ["src/SharedKernel/TechQA.SharedKernel/TechQA.SharedKernel.csproj", "src/SharedKernel/TechQA.SharedKernel/"]
RUN dotnet restore "src/Services/SectionService/TechQA.SectionService/TechQA.SectionService.csproj"
COPY . .
WORKDIR "/src/src/Services/SectionService/TechQA.SectionService"
RUN dotnet build "TechQA.SectionService.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TechQA.SectionService.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TechQA.SectionService.dll"]