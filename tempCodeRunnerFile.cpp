#include<iostream>
using namespace std;

void area_of_triangle(int num1, int num2)
{
    float result;
    result=0.5*num1*num2;
    cout<<"\nArea of triangle : "<<result;
}

void area_of_rectangle(int num1, int num2)
{
    int result;
    result=num1*num2;
    cout<<"\nArea of reactangle : "<<result;
}

int main()
{
    int base, height;
    cout<<"\nEnter the base : ";
    cin>>base;
    cout<<"\nEnter the height : ";
    cin>>height;

    area_of_triangle(base,height);
    area_of_rectangle(base,height);
}
